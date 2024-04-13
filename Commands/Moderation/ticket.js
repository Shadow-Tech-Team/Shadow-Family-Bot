import { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Colors, User} from "discord.js";
import Database from "../../Classes/Database/Database.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Ticket from "../../Classes/Ticket/Ticket.js";

const TicketData = new Database();
let OptionsData = []

export default {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Setup Ticket Setting.')
		.addSubcommand(subcommand =>
			subcommand.setName('main')
			.setDescription('Config Main Ticket Settings')
			.addChannelOption(option =>
				option.setName('category')
				.addChannelTypes(ChannelType.GuildCategory)
				.setDescription('Category Ticket ra Entekhab konid')
				.setRequired(true)
			)
			.addChannelOption(option =>
				option.setName('channel')
				.addChannelTypes(ChannelType.GuildText)
				.setDescription('Channeli Ke Mikhahid Ticket Menu dar an Vojud Dashte Bashad')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('title')
				.setDescription('Title Embed ra Benevisid')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('description')
				.setDescription('Description Embed ra Benevisid')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('color')
				.setDescription('Color Embed ra Benevisid be soorat hex (#012345)')
				.setRequired(true)
			)
		)

		.addSubcommand(subcommand =>
			subcommand.setName('options')
			.setDescription('Config Options')
			.addStringOption(option =>
				option.setName('name')
				.setDescription('Esm Option ra Benevisid.')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('value')
				.setDescription('LowerCase va bedoon fasele. (test_test or test)')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('description')
				.setDescription('Descripton Option ra Moshakhas Konid.)')
				.setRequired(true)
			)
			.addStringOption(option =>
				option.setName('emoji')
				.setDescription('Emoji Option ra Moshakhas konid. (👤)')
				.setRequired(true)
			)

			.addStringOption(option =>
				option.setName('supportrole')
				.setDescription('Role Supporter Ra Moshakhas Konid')
				.setRequired(true)
			)

			.addStringOption(option =>
				option.setName('supportermessage')
				.setDescription('Payami ke Hengam sakht ticket be supporter ha ersal mishavad ra benevisid')
				.setRequired(true)
			)
		)

		.addSubcommand(subCommand =>
			subCommand.setName("add")
			.setDescription('Add Kardan Karbar Be Ticket')
			.addUserOption(user =>
				user.setName('user')
				.setDescription('Karbari Ke Mikhahid Be Ticket Add Shavad Ra Tag Konid')
				.setRequired(true)
			)
		)

		.addSubcommand(subCommand =>
			subCommand.setName("remove")
			.setDescription('Remove Kardan Karbar Az Ticket')
			.addUserOption(user =>
				user.setName('user')
				.setDescription('Karbari Ke Mikhahid Az Ticket Remove Shavad Ra Tag Konid')
				.setRequired(true)
			)
		)

		.addSubcommand(subCommand =>
			subCommand.setName("rename")
			.setDescription('Avaz Kardan Esm Ticket Channel')
			.addStringOption(name =>
				name.setName('name')
				.setDescription('Esm Channel Ra Benevisid')
				.setRequired(true)
			)
		)

		.addSubcommand(subcommand =>
			subcommand.setName('complete')
			.setDescription('Finish Ticket Setup and Push it into Channel')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {

		const SubCommand = interaction.options.getSubcommand()

		const TicketEmbed = new EmbedCreator(client, interaction)

		const TicketClassData = new Ticket(client, interaction);

		await interaction.deferReply()

		let Options = {}

		switch (SubCommand) {
			case "main":

				// Get Options Value
				const Category = interaction.options.getChannel('category')
				const Channel = interaction.options.getChannel('channel')
				const EmebdTitle = interaction.options.getString('title')
				const EmebdDescription = interaction.options.getString('description')
				const EmebdColor = interaction.options.getString('color')

				// Set Options to Database
				TicketData.SetTicketSetting(interaction, client, Category.id, EmebdTitle, EmebdDescription, EmebdColor, Channel.id)

			break;

			case "options":

				// Get Options Value
				const OptionName = interaction.options.getString('name')
				const OptionValue = interaction.options.getString('value')
				const OptionDescription = interaction.options.getString('description')
				const OptionEmoji = interaction.options.getString('emoji')
				const OptionSupporterRole = interaction.options.getString('supportrole')
				const OptionSupporterMessage = interaction.options.getString('supportermessage')

				// Put All Options in a Object
				Options = await {
					name: OptionName,
					value: OptionValue,
					description: OptionDescription,
					emoji: OptionEmoji,
					supportrole: OptionSupporterRole,
					supportmessage: OptionSupporterMessage
				}

				// Push Object in a Array
				await OptionsData.push(Options)

				// Send Successfull Message
				await interaction.editReply({
					content: `Option Shoma Ba Esm **${OptionName}**, va Emoji **${OptionEmoji}** Save Shod, Ba Command \`/ticket complete\` Mitavanid Option Ha va Etelaat Embed dar Channeli Ke Dar Command \`/ticket main\` Entekhab Kardeid Gharar Bedid.`,
					ephemeral: true
				})

			break;

			case "complete":

				// Set Options From Local Array to Database Array
				await TicketData.SetTicketOptions(interaction, client, OptionsData)

				// Initial Ticket Embed and Select Menu
				TicketEmbed.TicketInitialization()

				// Clear Ticket Local Ticket Options Array
				OptionsData = []

				// Send Finish Message To Bot Owner
				await interaction.editReply({
					content: `**✅Shoma Ba Movafaghiyat Yek Ticket Menu ijad Kardid**`,
					ephemeral: true
				})
			break;

			case "add":
				const UserID = interaction.options.getUser('user')

				const AddedMessageEmbed = await TicketEmbed.ReturnDefault(Colors.Blue, `${UserID.globalName} Added To Ticket`, `Salam **<@${UserID.id}>** Aziz,\nShoma Tavasot Admin **<@${interaction.user.id}>** Be Ticket Add Shodid.`)

				TicketClassData.AddMember(client, interaction, UserID.id)

				await interaction.editReply({
					content: `<@${UserID.id}>:`,
					embeds: [AddedMessageEmbed]
				})
			break;

			case "remove":
				const RemovedUserID = interaction.options.getUser('user')

				const RemovedMessageEmbedToChannel = await TicketEmbed.ReturnDefault(Colors.Blue, `${RemovedUserID.globalName} Removed From Ticket`, `Salam **<@${RemovedUserID.id}>** Aziz,\nShoma Tavasot Admin **<@${interaction.user.id}>** Az Ticket Remove Shodid.`)

				const RemovedMessageEmbedToRemovedUser = await TicketEmbed.ReturnDefault(Colors.Blue, `Removed From Ticket`, `Salam **<@${RemovedUserID.id}>** Aziz,\nShoma Tavasot Admin **<@${interaction.user.id}>** Az Ticket Remove Shodid.`)

				TicketClassData.RemoveMember(client, interaction, RemovedUserID.id)

				await interaction.editReply({
					content: `<@${RemovedUserID.id}>:`,
					embeds: [RemovedMessageEmbedToChannel]
				})

				await client.users.send(RemovedUserID.id, {
					content: `<@${RemovedUserID.id}>:`,
					embeds: [RemovedMessageEmbedToRemovedUser]
				})
			break;

			case "rename":
				const ChannelName = interaction.options.getString('name');

				const RenamedChannelEmbedMessage = await TicketEmbed.ReturnDefault(Colors.Blue, `Channel Name Has Been Renamed`, `Admin **<@${interaction.user.id}>** Esm Ticket Ra Be **${ChannelName}** Taghir Dad.`)

				TicketClassData.RenameTicket(client, interaction, ChannelName)

				await interaction.editReply({
					embeds: [RenamedChannelEmbedMessage],
				})
			break;

			default:break;
		}

	},
};