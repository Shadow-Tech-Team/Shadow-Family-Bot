import Parser from "rss-parser";
import YTNotify from "../../Schemas/YTNotify.js";
import Messages from "../Messages/Messages.js"

const parser = new Parser();

export default class YouTubeNotifHandler {

    static async Init(client) {
        try {

            let Setups = await YTNotify.find()

            if (!Setups) return;
            if (Setups.length > 1) {
                await Promise.all(Setups.map(async data => {
                    setTimeout(async () => {
                            try {
                                let VideoData = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${data.ID}`);
                                if (!VideoData) return;

                                let GuildID = await client.guilds.cache.get(`${data.GuildID}`);
                                if (!GuildID) return;

                                let ChannelID = await client.channels.cache.get(`${data.Channel}`);
                                if (!ChannelID) return;

                                let { link, author, title, id } = VideoData.items[0];
                                if (data.Latest.includes(id)) return;
                                else {
                                    await YTNotify.updateOne({ GuildID: data.GuildID, ID: data.ID }, { $push: { Latest: id } })
                                }

                                let PingRole = data.PingRole;
                                if (PingRole) {
                                    if (PingRole === data.GuildID) PingRole = `@everyone`
                                    else PingRole = `<@&${data.PingRole}>`
                                } else {
                                    PingRole = 'none';
                                }

                                if (data.Message) {
                                    if (PingRole !== 'none') {
                                        await ChannelID.send({content: `${PingRole} \n\n${data.Message.replace('{author}', author).replace('{title}', title).replace('{link}', link)}`});
                                    } else {
                                        await ChannelID.send({content: `**${author}** hamin alan video **${title}** ro Upload kard.\n\n${link}`});
                                    }
                                } else {
                                    if (PingRole !== 'none') {
                                        await ChannelID.send({content: `${PingRole} \n\n **${author}** Hamin alan video **${title}** ro upload kard.\n\n${link}`});
                                    } else {
                                        await ChannelID.send({content: `**${author}** Hamin alan video **${title}** ro upload kard.\n\n${link}`})
                                    }
                                }
                            } catch (error) {
                                Messages.Error("YouTubeNotifHandler => Init -> One", error);
                            }
                    }, 5000)
                }))
            } else {
                try {
                    if (!Setups[0]) return;

                    let VideoData = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${Setups[0].ID}`);
                    if (!VideoData) return;

                    let GuildID = await client.guilds.cache.get(`${Setups[0].GuildID}`);
                    if (!GuildID) return;

                    let ChannelID = await client.channels.cache.get(`${Setups[0].Channel}`);
                    if (!ChannelID) return;

                    let { link, author, title, id } = VideoData.items[0];

                    if (Setups[0].Latest.includes(id)) {
                        return;
                    } else {
                        await YTNotify.updateOne({ GuildID: Setups[0].GuildID, ID: Setups[0].ID }, { $push: { Latest: id } })
                    }

                    let PingRole = Setups[0].PingRole;
                    if (PingRole) {
                        if (PingRole === Setups[0].GuildID) PingRole = `@everyone`
                        else PingRole = `<@&${Setups[0].PingRole}>`
                    } else {
                        PingRole = 'none';
                    }

                    if (Setups[0].Message) {
                        if (PingRole !== 'none') {
                            await ChannelID.send({content: `${PingRole}\n${Setups[0].Message.replace('{author}', author).replace('{title}', title).replace('{link}', link)}`});
                        } else {
                            await ChannelID.send({content: `${Setups[0].Message.replace('{author}', author).replace('{title}', title).replace('{link}', link)}`});
                        }
                    } else {
                        if (PingRole !== 'none') {
                            await ChannelID.send({content: `${PingRole}\n**${author}** Hamin alan video **${title}** ro upload kard.\n\n${link}`});
                        } else {
                            await ChannelID.send({content: `**${author}** Hamin alan video **${title}** ro upload kard.\n\n${link}`})
                        }
                    }
                } catch (error) {
                    Messages.Error("YouTubeNotifHandler => Init -> Two", error);
                }
            }


        } catch (error) {
            Messages.Error("YouTubeNotifHandler => Init", error);
        }
    }
}