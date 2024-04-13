import Parser from "rss-parser";
import YTNotify from "../../Schemas/YTNotify.js";

const parser = new Parser();

export default class YouTubeNotifHandler {

    static async Init(client) {

        try {

            client.checkUpdates = async () => {

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

                                let ChannelID = await guild.channels.cache.get(`${data.Channel}`);
                                if (!ChannelID) return;

                                let { link, author, title, id } = VideoData.items[0];
                                if (data.Latest.includes(id)) return;
                                else {
                                    await YTNotify.updateOne({ GuildID: data.GuildID, ID: data.ID }, { $push: { Latest: id } })
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
                                        // await
                                    }
                                }

                            } catch (error) {

                            }

                        })

                    }))

                }



            }

        } catch (error) {

        }

    }

}