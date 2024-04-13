import { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Colors} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Database from "../../Classes/Database/Database.js";

const Data = new Database();
export default {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Send Embed to Channell')
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('Role Ke Mikhahid Tag Shavad Ra Entekhab Konid')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('title')
            .setDescription('Title Embed Ra Benevisid')
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('description')
            .setDescription('Description Embed Ra Benevisid')
            .setRequired(false)
        )
        .addStringOption(model =>
            model.setName('color')
            .setDescription('Select Embed Color')
            .setRequired(false)
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
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
        // Call Embed Creator Class
		const SendEmbed = await new EmbedCreator(client, interaction)

        // Get Command Values
        const Title = interaction.options.getString('title')
        const Description = interaction.options.getString('description')
        const Color = interaction.options.getString('color')
        const Role = interaction.options.getRole('role')

        // Values Conditions
        const CheckDescriptionValueContion = typeof(Description) == "string" ? String(Description) : null
        const NextLineInDescriptionCondition = String(Description).split('/n').join('\n')
        const ColorChoosingCondition = typeof(Color) == "string" ? String(Color).charAt(0).toUpperCase() + String(Color).slice(1) : "Bigcommunity"
        const RoleCheckCondition = typeof(Role.id) == "string" ? String(Role.id) : null

        // Send Final Embed
        await SendEmbed.EmbedMessage(interaction.channel.id, Title, CheckDescriptionValueContion && NextLineInDescriptionCondition , ColorChoosingCondition, RoleCheckCondition)

        // Send Successfull Message
        await interaction.reply({content:`✅Shoma Yek Embed Dar Channel <#${interaction.channel.id}> Baraye Role <@&${Role.id}> Sakhtid.`, ephemeral: true})
	},
};