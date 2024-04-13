import { SlashCommandBuilder, ChannelType, PermissionFlagsBits} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";

export default {
	data: new SlashCommandBuilder()
		.setName('contact')
		.setDescription('Make a Contact Form.')
		.addChannelOption(option =>
			option.setName('channel')
			.addChannelTypes(ChannelType.GuildText)
			.setDescription('Channel Mored Nazar Khod Ra Entekhab konid')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
		const Channel = interaction.options.getChannel('channel')

		const SendEmbed = await new EmbedCreator(client, interaction)

		SendEmbed.ContactUsEmbed(Channel.id, 'Contact Us', 'Agar Moshkeli dar anjam farayand ha darid ya baraye ma pishnahadi darid ba Click bar rooye dokme zir va por kardan form mitunid ba ma dar ertebat bashid.')

		interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** yek Contact Form dar channel <#${Channel.id}> ijad kardid.`, ephemeral: true})
	},
};