import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import Database from "../Database/Database.js";
import Messages from "../Messages/Messages.js";
const TicketOption = new Database();
export default class SelectMenuCreator {

    constructor(client, interaction) {
        this.client = client
        this.interaction = interaction
    }

    async TicketBuilder() {
		try {
			const TicketBuilder = new StringSelectMenuBuilder()
				.setCustomId('ticket')
				.setPlaceholder('Open Ticket!');

			const TicketOptions = TicketOption.GetTicketOptions(this.interaction)

			for (let i = 0; i < TicketOptions.length; i++) {
				const SelectedIndex = TicketOptions[i];

				await TicketBuilder.addOptions(
					new StringSelectMenuOptionBuilder()
						.setLabel(SelectedIndex.name)
						.setDescription(SelectedIndex.description)
						.setValue(SelectedIndex.value)
						.setEmoji(SelectedIndex.emoji)
				)

			}

			const TicketRow = await new ActionRowBuilder().addComponents(TicketBuilder);

			return TicketRow
		} catch (error) {
			Messages.Error('SelectMenu => TicketBuilder', error)
		}
    }

}