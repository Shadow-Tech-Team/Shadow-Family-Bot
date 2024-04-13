import ButtonCreator from "../Button/ButtonCreator.js";
import EmbedCreator from "../Embed/EmbedCreator.js";
import Database from "../Database/Database.js";
import Ticket from "../Ticket/Ticket.js";
import Messages from "../Messages/Messages.js";

const TicketData = new Database();
const Timestamp = parseInt(new Date() / 1000)

export default class TicketHandler {

    static TicketCreate(client, Events) {
        try {
            client.on(Events.InteractionCreate, async interaction => {
                const TicketSetting = await new Ticket(client, interaction);
                if (interaction.isStringSelectMenu()) {
                    TicketData.GetTicketOptions(interaction).then((o) => {

                        for (let i = 0; i < o.length; i++) {

                            const SelectedElement = o[i];

                            if (interaction.values == SelectedElement.value) {
                                TicketSetting.Create(interaction, client, SelectedElement.supportrole, SelectedElement.supportmessage)
                            }

                        }
                    })
                }
            });
        } catch (error) {
            Messages.Error('TicketHandler => Ticket Create', error)
        }
    }

    static TicketButtonInteraction(client, Events) {
        client.on(Events.InteractionCreate, async interaction => {
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = new EmbedCreator(client, interaction);
            const TicketDataSetting = await TicketData.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const Button = new ButtonCreator(client, interaction);
            try {
                if (interaction.isButton()) {

                    switch (interaction.customId) {
                        case 'CloseTicket':
                            TicketSetting.Close(client, interaction)
                        break;

                        case 'ReOpenButton':
                            TicketSetting.ReOpen(client, interaction)
                        break;

                        case 'LockTicket':
                            TicketSetting.Lock(client, interaction)
                        break;

                        case 'UnLockTicket':
                            TicketSetting.UnLock(client, interaction)
                        break;

                        case 'DeleteButton':
                            TicketSetting.Delete(client, interaction)
                        break;

                        case 'TranscriptButton':
                            TicketSetting.Transcript()
                        break;

                        default:break;
                    }

                }
            } catch (error) {
                Messages.Error('TicketButtonInteraction', error)
            }

        });
    }

    static Load(client, Events) {
        this.TicketCreate(client, Events)
        this.TicketButtonInteraction(client, Events)
    }
}