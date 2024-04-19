import { SlashCommandBuilder, Colors, PermissionsBitField, WelcomeChannel} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Database from "../../Classes/Database/Database.js";

const ServerData = new Database();

export default {
    data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Setup Welcome Setting")
    .addChannelOption(channel => channel.setName('channel_id').setDescription('Choose Welcome Channel').setRequired(true))
    .addStringOption(channel => channel.setName('welcome_text').setDescription('Type Welcome Text').setRequired(true)),
    async execute(interaction, client) {

        const LogChannel = interaction.options.getChannel('channel_id')
        const FeedbackChannel = interaction.options.getString('welcome_text')

        const Embed = new EmbedCreator(client, interaction)

        // Check Member Permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [await Embed.ReturnDefault(Colors.Red, 'Can\'t Setup Welcome', ' **Permission Kafi** Baraye **Setup** kardan Welcome ro Nadarid.')], ephemeral: true })

        await ServerData.SetWelcomeSetting(interaction, client, LogChannel.id, FeedbackChannel)

        await interaction.reply({
            embeds: [await Embed.ReturnDefault(Colors.Red, 'Welcome Settings Has Been Saved', '✅Setting Welcome Dar Database Save Shod.')]
        })
    }
};