import { Colors } from "discord.js";
import Config from "../../Config/Config.json" assert { type: "json" }
import EmbedCreator from "../Embed/EmbedCreator.js"
import Messages from "../Messages/Messages.js";

const TimeStamp = `<t:${Math.floor(Date.now() / 1000)}:R>`

export default class StatusHandler {
    static async Init(interaction, client, OldStatus, NewStatus) {
        try {
            if (NewStatus.user.id !== Config.Main.BotUserID) return;

            const Bot = await client.users.fetch(Config.Main.BotUserID)

            if (!OldStatus && NewStatus.status !== 'offline') {
                await this.#SendMessage(`🌍 **${Bot.username}** Online Shod.\n${bot.username} (${Bot.id}) Offline Bood va alan Dar (${TimeStamp}) **Online** Shod. `)
            } else if (OldStatus.status !== 'offline' && NewStatus.status == 'offline') {
                await this.#SendMessage(`⚠️ Bot **${Bot.username}** Offline Shod.\n${bot.username} (${Bot.id}) Dar (${TimeStamp}) **Offline** Shod.`)
            }
        } catch (error) {
            Messages.Error('StatusHandler => Init', error)
        }
    }

    static async #SendMessage(Message) {
        try {
            const Embed = new EmbedCreator();
            const EmbedMessage = await Embed.ReturnDefault(Colors.Red, "Bot Status Handler", Message)

            const Developer = await client.users.fetch(Config.Main.Developer)

            Developer.send({embeds: [EmbedMessage]})
        } catch (error) {
            Messages.Error('StatusHandler => #SendMessage', error)
        }
    }
}