import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Colors } from "discord.js";
import LoadCommands from "../../Classes/Handlers/LoadCommands.js"

export default {
	data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload Commands and Events Without Restart Bot")
        .addSubcommand(subcommand => subcommand.setName('commands').setDescription('Reload Bot Commands'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
        const { user } = interaction;

        const SubCommand = interaction.options.getSubcommand();
        const ReloadEmbed = new EmbedBuilder()
            .setTimestamp()
            .setTitle('💻 Rebels Community Bot')
            .setColor(Colors.Purple);

        switch (SubCommand) {
            case 'commands': 
                LoadCommands.Load(client)
                interaction.reply({ embeds: [ReloadEmbed.setDescription('✅ Command ha ba Movafaghiyat **Reload** Shodand')] });
                console.log(`${user} Command Haro Reload Kard`);
            break;
            default:break;
        }
    },
};