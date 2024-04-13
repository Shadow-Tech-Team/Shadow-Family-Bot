import { SlashCommandBuilder, ChannelType, PermissionFlagsBits} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";

export default {
	data: new SlashCommandBuilder()
		.setName('panel')
		.setDescription('Create User Management Panel')
        .addSubcommand(subCommand => 
            subCommand.setName('dutypanel')
            .setDescription('Setup Admin Duty Time Status Panel')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('Title Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Description Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(model => 
                model.setName('color')
                .setDescription('Select Embed Color')
                .setRequired(true)
                .addChoices(
                    {
                        name: "White",
                        value: "white"
                    },
                    {
                        name: "Red",
                        value: "red"
                    },
                    {
                        name: "Yellow",
                        value: "yellow"
                    },
                    {
                        name: "Blue",
                        value: "blue"
                    },
                    {
                        name: "Green",
                        value: "green"
                    },
                    {
                        name: "Purple",
                        value: "purple"
                    },
                    {
                        name: "Grey",
                        value: "grey"
                    },
                    {
                        name: "Orange",
                        value: "orange"
                    },
                    {
                        name: "BiG Community",
                        value: "bigcommunity"
                    }
                )
            )
        )
        .addSubcommand(subCommand => 
            subCommand.setName('signuppanel')
            .setDescription('Setup User Signup Panel')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('Title Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Description Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(model => 
                model.setName('color')
                .setDescription('Select Embed Color')
                .setRequired(true)
                .addChoices(
                    {
                        name: "White",
                        value: "white"
                    },
                    {
                        name: "Red",
                        value: "red"
                    },
                    {
                        name: "Yellow",
                        value: "yellow"
                    },
                    {
                        name: "Blue",
                        value: "blue"
                    },
                    {
                        name: "Green",
                        value: "green"
                    },
                    {
                        name: "Purple",
                        value: "purple"
                    },
                    {
                        name: "Grey",
                        value: "grey"
                    },
                    {
                        name: "Orange",
                        value: "orange"
                    },
                    {
                        name: "BiG Community",
                        value: "bigcommunity"
                    }
                )
            )
        )
        .addSubcommand(subComman =>
            subComman.setName('loginpanel')
            .setDescription('Setup User Login Panel')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('Title Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('description')
                .setDescription('Description Embed Khod ra Benevisid')
                .setRequired(true)
            )
            .addStringOption(model => 
                model.setName('color')
                .setDescription('Select Embed Color')
                .setRequired(true)
                .addChoices(
                    {
                        name: "White",
                        value: "white"
                    },
                    {
                        name: "Red",
                        value: "red"
                    },
                    {
                        name: "Yellow",
                        value: "yellow"
                    },
                    {
                        name: "Blue",
                        value: "blue"
                    },
                    {
                        name: "Green",
                        value: "green"
                    },
                    {
                        name: "Purple",
                        value: "purple"
                    },
                    {
                        name: "Grey",
                        value: "grey"
                    },
                    {
                        name: "Orange",
                        value: "orange"
                    },
                    {
                        name: "BiG Community",
                        value: "bigcommunity"
                    }
                )
            )
        )
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
		const SendEmbed = await new EmbedCreator(client, interaction)

        const SubCommand = interaction.options.getSubcommand()

        switch (SubCommand) {
            case "signuppanel":
                const Title = interaction.options.getString('title')
                const Description = interaction.options.getString('description')
                const Color = interaction.options.getString('color')

                switch (Color) {
                    case 'white':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'White')
                    break;

                    case 'red':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Red')
                    break;

                    case 'yellow':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Yellow')
                    break;

                    case 'blue':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Blue')
                    break;

                    case 'green':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Green')
                    break;

                    case 'purple':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Purple')
                    break;

                    case 'grey':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Grey')
                    break;

                    case 'orange':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'Orange')
                    break;

                    case 'bigcommunity':
                        SendEmbed.UserPanelEmbed(interaction.channelId, Title, Description, 'BiGCommunity')
                    break;

                    default:break;
                }
            break;

            case "loginpanel":
                const LoginTitle = interaction.options.getString('title')
                const LoginDescription = interaction.options.getString('description')
                const LoginColor = interaction.options.getString('color')

                switch (LoginColor) {
                    case 'white':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'White')
                    break;

                    case 'red':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Red')
                    break;

                    case 'yellow':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Yellow')
                    break;

                    case 'blue':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Blue')
                    break;

                    case 'green':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Green')
                    break;

                    case 'purple':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Purple')
                    break;

                    case 'grey':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Grey')
                    break;

                    case 'orange':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'Orange')
                    break;

                    case 'bigcommunity':
                        SendEmbed.UserLoginPanel(interaction.channelId, LoginTitle, LoginDescription, 'BiGCommunity')
                    break;

                    default:break;
                }
            break;

            case "dutypanel":
                const DutyStatusTitle = interaction.options.getString('title')
                const DutyStatusDescription = interaction.options.getString('description')
                const DutyStatusColor = interaction.options.getString('color')

                switch (DutyStatusColor) {
                    case 'white':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'White')
                    break;

                    case 'red':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Red')
                    break;

                    case 'yellow':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Yellow')
                    break;

                    case 'blue':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Blue')
                    break;

                    case 'green':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Green')
                    break;

                    case 'purple':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Purple')
                    break;

                    case 'grey':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Grey')
                    break;

                    case 'orange':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'Orange')
                    break;

                    case 'bigcommunity':
                        SendEmbed.DutyPanelEmbed(interaction.channelId, DutyStatusTitle, DutyStatusDescription, 'BiGCommunity')
                    break;

                    default:break;
                }
            break;

            default:break;
        }

		interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** yek User Management Panel Dar <#${interaction.channelId}> ijad kardid.`, ephemeral: true})
	},
};