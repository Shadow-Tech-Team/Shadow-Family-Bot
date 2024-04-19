import { SlashCommandBuilder, Colors, PermissionsBitField, WelcomeChannel} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Database from "../../Classes/Database/Database.js";

const ServerData = new Database();

export default {
    data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup Bot Config")
    .addChannelOption(channel => channel.setName('log').setDescription('Choose Log Channel').setRequired(true))
    .addChannelOption(channel => channel.setName('feedback').setDescription('Choose Feedback Channel').setRequired(true))
    .addChannelOption(channel => channel.setName('contact').setDescription('Choose Contact Us Channel').setRequired(true)),
    async execute(interaction, client) {

        const LogChannel = interaction.options.getChannel('log')
        const FeedbackChannel = interaction.options.getChannel('feedback')
        const ContactUsChannel = interaction.options.getChannel('contact')

        const Embed = new EmbedCreator(client, interaction)
        const MessageEmbed = await Embed.ReturnDefault(Colors.Red, 'Settings Has Been Saved', '✅ Setting Channel Dar Database Save Shod.')
        const CantDoActionEmbedMessage = await Embed.ReturnDefault(Colors.Red, 'Can\'t Delete Ticket', 'Shoma **Permission Kafi** Baraye **Delete** Kardan Ticket Ra **Nadarid**.')

        // Check Member Permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [CantDoActionEmbedMessage], ephemeral: true })

        await ServerData.SetChannelSetting(interaction, client, ContactUsChannel.id, FeedbackChannel.id, LogChannel.id)

        await interaction.reply({
            embeds: [MessageEmbed]
        })
    },
};