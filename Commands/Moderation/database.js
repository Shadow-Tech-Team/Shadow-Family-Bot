import { SlashCommandBuilder, ChannelType, PermissionFlagsBits} from "discord.js";
import Database from "../../Classes/Database/Database.js";

const Data = new Database()

export default {
	data: new SlashCommandBuilder()
		.setName('database')
		.setDescription('Return Server Ingo from Database.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
        Data.GuildData(interaction, client)
	},
};