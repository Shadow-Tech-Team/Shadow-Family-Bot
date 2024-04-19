import { ActivityType, Client, GatewayIntentBits, Partials, Collection, Events } from "discord.js";
import Config from "../Config/Config.json" assert { type: "json" };
import { config } from "dotenv"; config();
import LoadCommands from "../Classes/Handlers/LoadCommands.js";
import EventHandler from "../Classes/Handlers/EventHandler.js";
import TicketHandler from "../Classes/Handlers/TicketHandler.js";
import Database from "../Classes/Database/Database.js";
/**
 * @param {Client} client
 * @param {Interaction} interaction
 */
export const client = new Client({ intents: [GatewayIntentBits.DirectMessages,GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildPresences], partials: [Partials.GuildMember, Partials.Channel, Partials.Message, Partials.User] });
client.SlashCommands = new Collection()
const Mongo = new Database(process.env.MONGOUSERNAME, process.env.MONGOPASSWORD)
export default class Main {
    constructor (Token = Config.Main.Token) {
        this.Token = Token
    }

    static async Start() {

        await Mongo.Connect()

        EventHandler.LoadEvents(client, Events, ActivityType)

        LoadCommands.Load(client)

        TicketHandler.Load(client, Events)

        client.login(Config.Main.Token);

    }

}