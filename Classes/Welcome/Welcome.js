// Import Packages
import { AttachmentBuilder } from "discord.js";
import { createCanvas, loadImage } from "canvas";

// Import Classes
import Messages from "../Messages/Messages.js";
import Database from "../Database/Database.js"

// Import Modules
import ApplyFont from "../../Modules/ApplyFont.js";
import Config from "../../Config/Config.json" assert { type: "json" }

// Main Welcome Class Code
export default class Welcome {
    static async WelcomeImage(interaction, client) {
        if (Config.Options.WelcomeImage == true) {
            try {
                const Data = new Database()
                const ChannelSetting = await Data.GetChannelSetting(interaction, client)
                const canvas = createCanvas(2560, 1600);
                const ctx = canvas.getContext('2d');
                const background = await loadImage('./Assets/Images/welcome.png');
                const avatar = await loadImage(interaction.user.displayAvatarURL({ extension: 'png', dynamic: true, size: 1_024 }));
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = ApplyFont(canvas, interaction.user.globalName)
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(interaction.user.globalName, 530, 547.5);
                ctx.beginPath();
                ctx.arc(284.5, 654.5, 214.7, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(avatar, 60, 425, 450, 450);
                const attachment = new AttachmentBuilder(await canvas.toBuffer(), { name: 'welcome.png' });
                const channel = client.channels.cache.get(ChannelSetting.WelcomeChannel);
                channel.send({ content:`<@${interaction.user.id}>`, files: [attachment] });
            } catch (error) {
                Messages.Error('Welcome => WelcomeImage', error)
            }
        }
    }

    static async WelcomeText(interaction, client) {
        if (Config.Options.WelcomeText == true) {
            try {
                const Data = new Database()
                const ChannelSetting = await Data.GetWelcomeSetting(interaction, client)
                const WelcomeChannel = client.channels.cache.get(ChannelSetting.ChannelID);

                WelcomeChannel.send({
                    content: `${ChannelSetting.WelcomeMessage.replace('{user}', `<@${interaction.user.id}>`)}`
                })
            } catch (error) {
                Messages.Error('Welcome => WelcomeText', error)
            }
        }
    }
}