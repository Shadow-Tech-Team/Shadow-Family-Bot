import { ActionRowBuilder, Colors, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import ButtonCreator from "../Button/ButtonCreator.js";
import Database from "../Database/Database.js";
import Messages from "../Messages/Messages.js";
const Data = new Database();
export default class EmbedCreator {

    constructor(client, interaction) {
        this.client = client
        this.interaction = interaction
    }

    async CreateEmbed(ChannelID, Title, Description, Color) {
        const NormalEmbed  = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

        switch (Color) {
            case 'White':
                NormalEmbed.setColor(Colors.White)
            break;

            case 'Red':
                NormalEmbed.setColor(Colors.Red)
            break;

            case 'Yellow':
                NormalEmbed.setColor(Colors.Yellow)
            break;

            case 'Blue':
                NormalEmbed.setColor(Colors.Blue)
            break;

            case 'Green':
                NormalEmbed.setColor(Colors.Green)
            break;

            case 'Purple':
                NormalEmbed.setColor(Colors.Purple)
            break;

            case 'Grey':
                NormalEmbed.setColor(Colors.Grey)
            break;

            case 'Orange':
                NormalEmbed.setColor(Colors.Orange)
            break;

            case 'BiGCommunity':
                NormalEmbed.setColor('E23E57')
            break;

            default:break;
        }


        let Channel;
        switch (typeof ChannelID) {
            case "string":
                Channel = await this.client.channels.cache.get(ChannelID)
                await Channel.send({embeds: [NormalEmbed]})
            break;

            case "number":
                Channel = await this.client.channels.cache.get(ChannelID.toString())
                await Channel.send({embeds: [NormalEmbed]})
            break;

            default:break;
        }

    }

    async UserPanelEmbed(ChannelID, Title, Description, Color) {
        const UserPanelEmbed = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            const Button = new ButtonCreator(this.client, this.interaction)
            const UserPanelEmbedButton = Button.Create('UserPanel', 'Enter Panel', false, 'Primary')
            const ActionRowButton = await new ActionRowBuilder().addComponents(UserPanelEmbedButton)

        switch (Color) {
            case 'White':
                UserPanelEmbed.setColor(Colors.White)
            break;

            case 'Red':
                UserPanelEmbed.setColor(Colors.Red)
            break;

            case 'Yellow':
                UserPanelEmbed.setColor(Colors.Yellow)
            break;

            case 'Blue':
                UserPanelEmbed.setColor(Colors.Blue)
            break;

            case 'Green':
                UserPanelEmbed.setColor(Colors.Green)
            break;

            case 'Purple':
                UserPanelEmbed.setColor(Colors.Purple)
            break;

            case 'Grey':
                UserPanelEmbed.setColor(Colors.Grey)
            break;

            case 'Orange':
                UserPanelEmbed.setColor(Colors.Orange)
            break;

            case 'BiGCommunity':
                UserPanelEmbed.setColor('E23E57')
            break;

            default:break;
        }


        let Channel;
        switch (typeof ChannelID) {
            case "string":
                Channel = await this.client.channels.cache.get(ChannelID)
                await Channel.send({embeds: [UserPanelEmbed], components: [ActionRowButton]})
            break;

            case "number":
                Channel = await this.client.channels.cache.get(ChannelID.toString())
                await Channel.send({embeds: [UserPanelEmbed], components: [ActionRowButton]})
            break;

            default:break;
        }

    }

    async UserLoginPanel(ChannelID, Title, Description, Color) {
        const UserLoginPanelEmbed = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            const Button = new ButtonCreator(this.client, this.interaction)
            const UserPanelEmbedButton = Button.Create('UserLoginPanel', 'Enter Panel', false, 'Primary')
            const ActionRowButton = await new ActionRowBuilder().addComponents(UserPanelEmbedButton)

        switch (Color) {
            case 'White':
                UserLoginPanelEmbed.setColor(Colors.White)
            break;

            case 'Red':
                UserLoginPanelEmbed.setColor(Colors.Red)
            break;

            case 'Yellow':
                UserLoginPanelEmbed.setColor(Colors.Yellow)
            break;

            case 'Blue':
                UserLoginPanelEmbed.setColor(Colors.Blue)
            break;

            case 'Green':
                UserLoginPanelEmbed.setColor(Colors.Green)
            break;

            case 'Purple':
                UserLoginPanelEmbed.setColor(Colors.Purple)
            break;

            case 'Grey':
                UserLoginPanelEmbed.setColor(Colors.Grey)
            break;

            case 'Orange':
                UserLoginPanelEmbed.setColor(Colors.Orange)
            break;

            case 'BiGCommunity':
                UserLoginPanelEmbed.setColor('E23E57')
            break;

            default:break;
        }


        let Channel;
        switch (typeof ChannelID) {
            case "string":
                Channel = await this.client.channels.cache.get(ChannelID)
                await Channel.send({embeds: [UserLoginPanelEmbed], components: [ActionRowButton]})
            break;

            case "number":
                Channel = await this.client.channels.cache.get(ChannelID.toString())
                await Channel.send({embeds: [UserLoginPanelEmbed], components: [ActionRowButton]})
            break;

            default:break;
        }
    }

    async DutyPanelEmbed(ChannelID, Title, Description, Color) {
        const UserPanelEmbed = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            const Button = new ButtonCreator(this.client, this.interaction)
            const OnDutyButton = Button.Create('OnDuty', 'On Duty', false, 'Success')
            const OffDutyButton = Button.Create('OffDuty', 'Off Duty', false, 'Danger')
            const CheckDutyTime = Button.Create('CheckDutyTime', 'On Duty Time', false, 'Primary')
            const ActionRowButton = await new ActionRowBuilder().addComponents([OnDutyButton, OffDutyButton, CheckDutyTime])

        switch (Color) {
            case 'White':
                UserPanelEmbed.setColor(Colors.White)
            break;

            case 'Red':
                UserPanelEmbed.setColor(Colors.Red)
            break;

            case 'Yellow':
                UserPanelEmbed.setColor(Colors.Yellow)
            break;

            case 'Blue':
                UserPanelEmbed.setColor(Colors.Blue)
            break;

            case 'Green':
                UserPanelEmbed.setColor(Colors.Green)
            break;

            case 'Purple':
                UserPanelEmbed.setColor(Colors.Purple)
            break;

            case 'Grey':
                UserPanelEmbed.setColor(Colors.Grey)
            break;

            case 'Orange':
                UserPanelEmbed.setColor(Colors.Orange)
            break;

            case 'BiGCommunity':
                UserPanelEmbed.setColor('E23E57')
            break;

            default:break;
        }


        let Channel;
        switch (typeof ChannelID) {
            case "string":
                Channel = await this.client.channels.cache.get(ChannelID)
                await Channel.send({embeds: [UserPanelEmbed], components: [ActionRowButton]})
            break;

            case "number":
                Channel = await this.client.channels.cache.get(ChannelID.toString())
                await Channel.send({embeds: [UserPanelEmbed], components: [ActionRowButton]})
            break;

            default:break;
        }

    }

    async ContactUsEmbed(ChannelID, Title, Description) {
        try {
            // Make A Button for Opening Modal
            const Button = new ButtonCreator(this.client, this.interaction)
            const ContactEmbedButton = Button.Create('ContactButton', 'Contact Us!', false)
            const ActionRowButton = await new ActionRowBuilder().addComponents(ContactEmbedButton)

            const ContactUsEmbed  = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(Title)
                .setDescription(Description)
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            let Channel;
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            await Channel.send({embeds: [ContactUsEmbed], components: [ActionRowButton]})
        } catch (error) {
            Messages.Error('EmbedCreator => Contact Us Embed', error)
        }
    }

    async ContactEmbedLog(ChannelID, Title, Description) {
        try {
            const ContactEmbedLog = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(Title)
                .setDescription(Description)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            let Channel;
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            await Channel.send({embeds: [ContactEmbedLog]})
        } catch (error) {
            Messages.Error('EmbedCreator => Contact Us Embed Log', error)
        }
    }

    async FeedbackEmbed(ChannelID, Title, Description) {
        try {
            // Make A Button for Opening Modal
            const Button = new ButtonCreator(this.client, this.interaction)
            const FeedbackEmbedButton = Button.Create('FeedbackButton', 'Give Feedback', false)
            const ActionRowButton = await new ActionRowBuilder().addComponents(FeedbackEmbedButton)

            const FeedbackEmbed  = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(Title)
                .setDescription(Description)
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            let Channel;
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            await Channel.send({embeds: [FeedbackEmbed], components: [ActionRowButton]})
        } catch (error) {
            Messages.Error('Embed Creator => FeedBack Embed', error)
        }
    }

    async FeedbackEmbedLog(ChannelID, Title, Description) {
        try {
            const FeedbackEmbedLog = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle(Title)
                .setDescription(Description)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            let Channel;
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            await Channel.send({embeds: [FeedbackEmbedLog]})
        } catch (error) {
            Messages.Error('EmbedCreator => Feedback Embed Log', error)
        }
    }

    async TicketInitialization() {
        try {
            // Get Ticket Seeting like category and embeds data
            const TicketData = await Data.GetTicketSetting(this.interaction)

            // Create Embed
            const SetupEmbed = new EmbedBuilder()
                .setColor(TicketData.EmbedColor)
                .setTitle(TicketData.EmbedTitle)
                .setDescription(TicketData.EmbedDescription)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            // Get Channel ID
            let Channel = TicketData.Channel
            switch (typeof Channel) {
                case "string":
                    Channel = await this.client.channels.cache.get(Channel)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(Channel.toString())
                break;

                default:break;
            }

            // Create Select Menu Options
            const TicketBuilder = await new StringSelectMenuBuilder()
                .setCustomId('ticket')
                .setPlaceholder('Open Ticket!');

            // Get Options From Database
            const TicketOptions = await Data.GetTicketOptions(this.interaction)

            // Put All Options in a Option List
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

            // Compile Options to a Action Row
            const TicketRow = await new ActionRowBuilder().addComponents(TicketBuilder);

            // Send Ticket Embed and Put Menu Below Embed
            await Channel.send({embeds: [SetupEmbed], components: [TicketRow]})

        } catch (error) {
            Messages.Error('EmbedCreator => Ticket Initialization', error)
        }
    }

    async Ticket(ChannelID, Color, Title, Description, SupportRoleID, SupportRoleMessage) {
        try {
            // Import Created Button
            const Button = new ButtonCreator(this.client, this.interaction)

            // Set Button Values
            const TicketButtons = Button.Ticket('CloseTicket', 'Close', false, '❌', 'LockTicket', 'Lock', false, '🔒')

            // Compile Button to a Action Row
            const ActionRowTicketCloseButton = await new ActionRowBuilder().addComponents(TicketButtons.Close, TicketButtons.Lock)

            // Create Ticket
            const TicketMessageEmbed = new EmbedBuilder()
                .setColor(Color)
                .setTitle(Title)
                .setDescription(Description)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            // Create Null Variable
            let Channel;

            // Check Channel ID and Return it Into That `Channel` Variable
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            // Send Ticket and Buttons to Selected Channel
            await Channel.send({
                embeds: [TicketMessageEmbed],
                components: [ActionRowTicketCloseButton],
                content: `Salam <@&${SupportRoleID}> Haye Aziz, ${SupportRoleMessage}`
            })

        } catch (error) {
            Messages.Embed('EmbedCreator => Ticket', error)
        }
    }

    async EmbedMessage(ChannelID, Title, Description, Color, Role) {
        const EmbedCommandMessage = new EmbedBuilder()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

        switch (Color) {
            case 'White':
                EmbedCommandMessage.setColor(Colors.White)
            break;

            case 'Red':
                EmbedCommandMessage.setColor(Colors.Red)
            break;

            case 'Yellow':
                EmbedCommandMessage.setColor(Colors.Yellow)
            break;

            case 'Blue':
                EmbedCommandMessage.setColor(Colors.Blue)
            break;

            case 'Green':
                EmbedCommandMessage.setColor(Colors.Green)
            break;

            case 'Purple':
                EmbedCommandMessage.setColor(Colors.Purple)
            break;

            case 'Grey':
                EmbedCommandMessage.setColor(Colors.Grey)
            break;

            case 'Orange':
                EmbedCommandMessage.setColor(Colors.Orange)
            break;

            case 'Bigcommunity':
                EmbedCommandMessage.setColor('E23E57')
            break;

            default:break;
        }


        let Channel;
        switch (typeof ChannelID) {
            case "string":
                Channel = await this.client.channels.cache.get(ChannelID)
                await Channel.send({content: `<@&${Role}>`, embeds: [EmbedCommandMessage]})
            break;

            case "number":
                Channel = await this.client.channels.cache.get(ChannelID.toString())
                await Channel.send({content: `<@&${Role}>`, embeds: [EmbedCommandMessage]})
            break;

            default:break;
        }
    }

    async Default(ChannelID, Title, Description) {
        try {
            const SetupEmbed = new EmbedBuilder()
                .setColor(Colors.Blue)
                .setTitle(Title)
                .setDescription(Description)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            let Channel;
            switch (typeof ChannelID) {
                case "string":
                    Channel = await this.client.channels.cache.get(ChannelID)
                break;

                case "number":
                    Channel = await this.client.channels.cache.get(ChannelID.toString())
                break;

                default:break;
            }

            await Channel.send({embeds: [SetupEmbed]})
        } catch (error) {
            Messages.Error('EmbedCreator => Default', error)
        }
    }

    async ReturnDefault(Color, Title, Description) {
        try {
            const ReturnEmbed = await new EmbedBuilder()
                .setTitle(Title)
                .setDescription(Description)
                .setColor(Color)
                .setTimestamp()
                .setFooter({text: "Made with ❤️ by Shadow Tech Team"});

            return ReturnEmbed
        } catch (error) {
            Messages.Embed('EmbedCreator => Return Default', error)
        }
    }
}