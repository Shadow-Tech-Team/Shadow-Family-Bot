import { ButtonBuilder, ButtonStyle } from "discord.js"
import Messages from "../Messages/Messages.js";

export default class ButtonCreator {
    constructor(client, interaction) {
        this.client = client
        this.interaction = interaction
    }

    Create(ButtonID, ButtonLabel, isDisabled, Style) {
        try {
            const Button = new ButtonBuilder()
                .setCustomId(ButtonID)
                .setLabel(ButtonLabel)
                .setDisabled(isDisabled);

                switch (Style) {
                    case 'Primary':
                        Button.setStyle(ButtonStyle.Primary)
                        return Button
                    break;

                    case 'Secondary':
                        Button.setStyle(ButtonStyle.Secondary)
                        return Button
                    break;

                    case 'Success':
                        Button.setStyle(ButtonStyle.Success)
                        return Button
                    break;

                    case 'Danger':
                        Button.setStyle(ButtonStyle.Danger)
                        return Button
                    break;

                    default:break;
                }
        } catch (error) {
            Messages.Error('Button => Create', error)
        }
    }

    Ticket(CloseID, CloseLabel, CloseDisableStatus, CloseEmoji, LockID, LockLabel, LockDisbaleStatus, LockEmoji) {
        try {
            // Create Close Button Befor Compiling to Action Row (Compilation In EmbedCreator Class)
            const CloseButton = new ButtonBuilder()
                .setCustomId(CloseID)
                .setLabel(CloseLabel)
                .setDisabled(CloseDisableStatus)
                .setEmoji(CloseEmoji)
                .setStyle(ButtonStyle.Danger);

            // Create Close Button Befor Compiling to Action Row (Compilation In EmbedCreator Class)
            const LockButton = new ButtonBuilder()
                .setCustomId(LockID)
                .setLabel(LockLabel)
                .setDisabled(LockDisbaleStatus)
                .setEmoji(LockEmoji)
                .setStyle(ButtonStyle.Secondary);

            // Return UnCompiled Button and Send it Into EmbedCreator Class

            return {
                Close: CloseButton,
                Lock: LockButton
            }
        } catch (error) {
            Messages.Error('Button => Ticket', error)
        }
    }

    TicketAfterClose(ReOpenID, ReOpenLabel, ReOpenDisableStatus, ReOpenEmoji, DeleteID, DeleteLabel, DeleteDisbaleStatus, DeleteEmoji, TranscriptID, TranscriptLabel, TranscriptDisbaleStatus, TranscriptEmoji) {

        try {
            // Create Re-Open Button Befor Compiling to Action Row (Compilation In EmbedCreator Class)
            const ReOpenButton = new ButtonBuilder()
                .setCustomId(ReOpenID)
                .setLabel(ReOpenLabel)
                .setDisabled(ReOpenDisableStatus)
                .setEmoji(ReOpenEmoji)
                .setStyle(ButtonStyle.Success);

            // Create Delete Button Befor Compiling to Action Row (Compilation In EmbedCreator Class)
            const DeleteButton = new ButtonBuilder()
                .setCustomId(DeleteID)
                .setLabel(DeleteLabel)
                .setDisabled(DeleteDisbaleStatus)
                .setEmoji(DeleteEmoji)
                .setStyle(ButtonStyle.Danger);

            // Create Transcript Button Befor Compiling to Action Row (Compilation In EmbedCreator Class)
            const TranscriptButton = new ButtonBuilder()
                .setCustomId(TranscriptID)
                .setLabel(TranscriptLabel)
                .setDisabled(TranscriptDisbaleStatus)
                .setEmoji(TranscriptEmoji)
                .setStyle(ButtonStyle.Primary);

            // Return UnCompiled Button and Send it Into EmbedCreator Class
            return {
                ReOpen: ReOpenButton,
                Delete: DeleteButton,
                Transcript: TranscriptButton
            }
        } catch (error) {
            Messages.Error('Button => Ticket After Close', error)
        }

    }
}