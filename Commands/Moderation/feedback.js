import { SlashCommandBuilder, ChannelType, PermissionFlagsBits} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";

export default {
	data: new SlashCommandBuilder()
		.setName('feedback')
		.setDescription('Make a Feedback form.')
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

		SendEmbed.FeedbackEmbed(Channel.id, 'Leave Us a Feedback', 'Lotfan nazar khod ra dar mored mahsooli ke az team ma kharidari karde boodid bayan konid. ')

		interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** yek Feedback form dar channel <#${Channel.id}> ijad kardid.`, ephemeral: true})
	},
};