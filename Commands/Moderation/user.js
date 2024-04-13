import { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Colors} from "discord.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";
import Database from "../../Classes/Database/Database.js";

const Data = new Database();
export default {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Manage User Account')
        .addSubcommand(subCommand =>
            subCommand.setName('addpoint')
            .setDescription('Add Point To Selected User')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('User Mored Nazar Khod Ra Entekhab Konid')
                .setRequired(true)
            )
            .addNumberOption(option =>
                option.setName('point')
                .setDescription('Meghdar Pointi Ke Mikhahid Be User Add Shavad')
                .setRequired(true)
            )

        )
        .addSubcommand(subCommand =>
            subCommand.setName('removepoint')
            .setDescription('Remove Point From Selected User')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('User Mored Nazar Khod Ra Entekhab Konid')
                .setRequired(true)
            )
            .addNumberOption(option =>
                option.setName('point')
                .setDescription('Meghdar Pointi Ke Mikhahid Az User Kam Shavad')
                .setRequired(true)
            )
        )
        .addSubcommand(subCommand =>
            subCommand.setName('getinfo')
            .setDescription('Get Selected User Account Info')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('User Mored Nazar Khod Ra Entekhab Konid')
                .setRequired(true)
            )
        )
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
		const SendEmbed = await new EmbedCreator(client, interaction)

        const SubCommand = interaction.options.getSubcommand()

        switch (SubCommand) {

            case "addpoint":
                const UserID = interaction.options.getUser('user').id
                const PointsToAdd = interaction.options.getNumber('point')

                const PointAdded = await Data.AddPoint(interaction, client, UserID, PointsToAdd)

                PointAdded

		        interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** Be Karbar <@${UserID}>, **${PointsToAdd}** Ezafe Kardid Va Point Karbar ra be **${PointAdded.Point}** Taghir Dadid`, ephemeral: true})
            break;

            case "removepoint":
                const User = interaction.options.getUser('user').id
                const PointsToRemove = interaction.options.getNumber('point')

                const PointRemoved = await Data.RemovePoint(interaction, client, User, PointsToRemove)

                PointRemoved

		        interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** Be Karbar <@${User}>, **${PointsToRemove}** Kam Kardid Va Point Karbar ra be **${PointRemoved.Point}** Taghir Dadid`, ephemeral: true})
            break;

            case "getinfo":
                const EmbedMessage = new EmbedCreator(client, interaction)

                const UserInfo = interaction.options.getUser('user').id

                const UserData = await Data.FetchUser(interaction, client, UserInfo)

                const FinalEmbed = await EmbedMessage.ReturnDefault(Colors.Green, `${UserData.UserName} Account Info`, `You Can See ${UserData.UserName} Accounts Info Here.\n\n\`📧\`Email: **${UserData.UserEmail}**,\n\`📞\`Phone Number: **${UserData.UserNumber}**.\n\n\nYou Can See ${UserData.UserName} Accounts Point Info Here.\n\`✅\`Current Points: **${UserData.UserCurrentPoint}**,\n\`➖\`Removed Points: **${UserData.UserRemovedPoint}**,\n\`💠\`All Points: **${UserData.UserAllPoint}**.`)

		        interaction.reply({content:`✅ Shoma Ba **Movafaghiyat** Be Etelaat Account **${UserData.UserName}** Dastresi Peyda Kardid.`, embeds:[FinalEmbed], ephemeral: true})
            break;

            default:break;
        }

	},
};