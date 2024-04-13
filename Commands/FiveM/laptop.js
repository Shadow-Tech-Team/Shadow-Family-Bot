import { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Colors} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Database from "../../Classes/Database/Database.js";
const Data = new Database();

export default {
	data: new SlashCommandBuilder()
		.setName('laptop')
		.setDescription('Modify Laptop Gangs')
        .addSubcommand(subCommand =>
            subCommand.setName('show')
            .setDescription('Show Whitlisted Gangs')
        )
        .addSubcommand(subCommand =>
            subCommand.setName('add')
            .setDescription('Add Gang to Laptop Whitlisted Gangs')
            .addStringOption(option =>
                option.setName('gang_name')
                .setDescription('Enter Gang Name')
                .setRequired(true)
            )
        )
        .addSubcommand(subCommand =>
            subCommand.setName('remove')
            .setDescription('Remove Gang from Laptop Whitlisted Gangs')
            .addStringOption(option =>
                option.setName('gang_name')
                .setDescription('Enter Gang Name')
                .setRequired(true)
            )
        )
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
        const Embed = await new EmbedCreator(client, interaction)
        const SubCommand = interaction.options.getSubcommand()

        switch (SubCommand) {
            case "show":
                await Data.GangLaptop('show').then(async gangs => {
                    await interaction.reply({
                        embeds:[await Embed.ReturnDefault(Colors.DarkRed, 'Whitelisted Laptop Gangs', `${gangs.toString()}`)]
                    })
                })
            break;

            case "add":
                const GangNameForAdd = interaction.options.getString('gang_name')
                await Data.GangLaptop('add', GangNameForAdd).then(async resault => {
                    await interaction.reply({
                        embeds:[await Embed.ReturnDefault(Colors.DarkRed, 'Whitelisted Laptop Gangs', `${resault}`)]
                    })
                })
            break;

            case "remove":
                const GangNameForRemove = interaction.options.getString('gang_name')
                await Data.GangLaptop('remove', GangNameForRemove).then(async resault => {
                    await interaction.reply({
                        embeds:[await Embed.ReturnDefault(Colors.DarkRed, 'Whitelisted Laptop Gangs', `${resault}`)]
                    })
                })
            break;

            default:break;
        }
	},
};