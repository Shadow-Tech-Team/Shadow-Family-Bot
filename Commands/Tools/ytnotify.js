import { SlashCommandBuilder, ChannelType, PermissionsBitField, PermissionFlagsBits, Colors } from "discord.js";
import YTNotify from "../../Schemas/YTNotify.js";
import Parser from "rss-parser";
import Messages from "../../Classes/Messages/Messages.js";
import EmbedCreator from "../../Classes/Embed/EmbedCreator.js";

const parser = new Parser();

export default {
	data: new SlashCommandBuilder()
	.setName('ytnotify')
	.setDescription('Config Youtube Video Notification System')
    .addSubcommand(command =>
        command.setName('add').setDescription('Setup YT Notification System For selected YT Channel')
        .addStringOption(option =>
            option.setName('yt_channel_id').setDescription('ID of Youtube Channel')
            .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel_id').setDescription('Select Channel you Want to Send Notification in it')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message').setDescription('A Custom Message for Notification. Use {author}, {title}, {link}')
            .setRequired(false)
        )
        .addRoleOption(option =>
            option.setName('role').setDescription('Select role you want to be Tagged')
            .setRequired(false)
        )
    )
    .addSubcommand(command =>
        command.setName('remove').setDescription('Remove Channel from YT Notification System')
        .addStringOption(option =>
            option.setName('yt_channel_id').setDescription('ID of Youtube Channel')
            .setRequired(true)
        )
    )
    ,
	async execute(interaction, client) {
        const Embed = new EmbedCreator(client, interaction);
        const { options } = interaction;
        const SubCommands = options.getSubcommand();
        const Data = await YTNotify.find({ GuildID: interaction.guild.id });

        switch (SubCommands) {
            case "add":
                if (Data.length) {
                    if (Data.length >= 5) {
                        return await interaction.reply({
                            content: `Shoma Faghat mitavanid **5** Notification Faal Dar Lahze Dashte Bashid.`,
                            ephemeral: true
                        })
                    }
                }

                const YoutbeChannelID = await options.getString('yt_channel_id');
                const DiscordChannelID = await options.getChannel('channel_id');
                const PingRole = await options.getRole('role');
                const Message = await options.getString('message');

                let Role = 'none';

                if (PingRole) {
                    Role = PingRole.id;
                }

                let CheckData = await YTNotify.findOne({ GuildID: interaction.guild.id, ID: YoutbeChannelID });
                if (CheckData) {
                    await interaction.deferReply({ ephemeral: true });

                    let Author = '';

                    let VideoData = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${YoutbeChannelID}`);
                    if (VideoData) {
                        Author = VideoData.items[0].author;
                    } else {
                        Author = "Unknown";
                    }

                    return await interaction.editReply({
                        content: `Shoma dar Hal Hazer yek Setup Baraye Channel **${Author}** Darid.`,
                        ephemeral: true
                    })
                } else {
                    await interaction.deferReply({ ephemeral: true });
                }

                try {
                    let Author = '';

                    let VideoData = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${YoutbeChannelID}`);
                    if (VideoData) {
                        Author = VideoData.items[0].author;
                    } else {
                        Author = "Unknown";
                    }

                    const FinalEmbedMessage = await Embed.ReturnDefault(Colors.Green, 'YT Notification has been setuped',
                       `Channel: **${Author}**,\nNotification Channel: ${DiscordChannelID},${PingRole ? `\nRole: <@&${PingRole.id}>,` : ``}${Message ? `\nMessage: **${Message.replace('{author}','Channel').replace('{link}','youtube.com').replace('{title}','Title Shoma')}**.` : ``}`
                    )

                    await interaction.editReply({
                        embeds:[FinalEmbedMessage],
                        ephemeral: true
                    })

                } catch (error) {
                    await Messages.Error('ytnotify => SwithCase -> add')
                    await interaction.editReply({
                        content: `Channel Youtube ba ID ${YoutbeChannelID} Vojud Nadarad.`,
                        ephemeral: true
                    })
                }

                await YTNotify.create({
                    GuildID: interaction.guild.id,
                    Channel: DiscordChannelID.id,
                    ID:  YoutbeChannelID,
                    Latest: 'none',
                    Message: Message || ``,
                    PingRole: Role || ``
                })
            break;

            case "remove":
                if (!Data) {
                    return await interaction.reply({ content: `Setup Channel Youtube Shoma Peyda Nashod.`, ephemeral: true });
                } else {
                    const YoutbeChannelID = await options.getString('yt_channel_id');
                    let CheckData = await YTNotify.findOne({ GuildID: interaction.guild.id, ID: YoutbeChannelID });

                    if (!CheckData) {
                        return await interaction.reply({ content: `Setup Channel Youtube Shoma Dar Database Peyda Nashod.`, ephemeral: true });
                    } else {
                        const RemoveEmbedMessage = await Embed.ReturnDefault(Colors.Red, 'YT Notification has been deleted', `Setting Notification Channel ${YoutbeChannelID} az Database remove Shod.`)

                        await interaction.reply({
                            embeds: [RemoveEmbedMessage],
                            ephemeral: true
                        })
                        await YTNotify.deleteMany({ GuildID: interaction.guild.id, ID: YoutbeChannelID})
                    }
                }
            break;

            default:break;
        }

    }
};