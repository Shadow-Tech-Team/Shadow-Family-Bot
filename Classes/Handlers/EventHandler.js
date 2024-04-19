import { Colors, PermissionsBitField, version } from "discord.js";
import chalk from "chalk";
import ModalCreator from "../Modal/ModalCreator.js";
import Config from "../../Config/Config.json"  assert { type: "json" };
import EmbedCreator from "../Embed/EmbedCreator.js";
import Messages from "../Messages/Messages.js";
import { log } from "console";
import UserViewManager from "../UserViewManager/UserViewManager.js";
import UserManagement from "../UserManagement/UserManagement.js";
import CrashHandler from "./CrashHandler.js";
import Welcome from "../Welcome/Welcome.js";
import DutyHandler from "../DutyHandler/DutyHandler.js";
import YouTubeNotifHandler from "./YouTubeNotifHandler.js";

export default class EventHandler {

    static ClientReady(client, Events, ActivityType) {
        try {
            let MemoryUsage = ((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)
            client.once(Events.ClientReady, c => {
                log(`Logged in as ${chalk.green(client.user.tag)}`)
                log(`Node.js Version ${chalk.green(process.versions.node)}`)
                log(`Discord.js Version ${chalk.green(version)}`)
                log(`Memory Usage ${chalk.green(MemoryUsage)} MB`)
                log(chalk.greenBright(`Bot is Online Sir! Logged in as ${c.user.tag}`));
                setInterval(async ()  => YouTubeNotifHandler.Init(client), 10000)
            });
        } catch (error) {
            Messages.Error('EventHandler => Client Ready', error)
        }
    }

    static WelcomeMessageHandler(client, Events) {
        try {
            client.on(Events.GuildMemberAdd, async interaction => {
                if (Config.Options.WelcomeImage == true) {
                    Welcome.WelcomeImage(interaction, client)
                } else if (Config.Options.WelcomeText == true) {
                    Welcome.WelcomeText(interaction, client)
                }
                // console.log(member)
            })
        } catch (error) {
            Messages.Error("EventHandler => WelcomeMessageHandler", error)
        }
    }

    static SetStatus(client, ActivityType) {
        try {
            client.user.setPresence({
                activities: [{ name: `People`, type: ActivityType.Watching }],
                status: 'online',
            });
        } catch (error) {
            Messages.Error('EventHandler => Set Status', error)
        }
    }

    static InteractionCreate(client, Events) {
        try {
            client.on(Events.InteractionCreate, async interaction => {
                const SendEmbed = await new EmbedCreator(client)
                if (interaction.isChatInputCommand()) {

                    const command = interaction.client.SlashCommands.get(interaction.commandName);

                    if (!command) {
                        log(`No command matching ${interaction.commandName} was found.`);
                        return;
                    }

                    try {
                        await command.execute(interaction, client);
                    } catch (error) {
                        log(`Error executing ${interaction.commandName}`);
                        log(error);
                    }
                } else if (interaction.isButton()) {
                    switch (interaction.customId) {
                        case "ContactButton":
                            await ModalCreator.ContactUs(client, interaction, 'Contact Us', 'What is You\'r Email', 'What is You\'r Message?', 'What is You\'r Name?', 'What is You\'r Discord Username?', Config.Main.ContactUsLogsChannel)
                        break;

                        case "FeedbackButton":
                            await ModalCreator.Feedback(client, interaction, 'Leave Us a Feedback', 'What is You\'r Product', 'What is You\'r Message?', 'What is You\'r Name?', 'What is You\'r Discord Username?', Config.Main.FeedbackUsChannel)
                        break;

                        case "UserPanel":
                            await ModalCreator.CreateUser(client, interaction, 'Create User', 'What is You\'r Email', 'What is You\'r Name?', 'What is You\'r Password?', 'What is You\'r Number?', interaction.channelId)
                        break;

                        case "UserLoginPanel":
                            await ModalCreator.LoginUser(client, interaction, 'Login into Your Account', 'Enter You\'r Password Here', interaction.channelId)
                        break;

                        case "OnDuty":
                            await DutyHandler.OnDuty(interaction, interaction.user.id, interaction.user.displayName, (new Date().getTime() / 1000 | 0))
                        break;

                        case "OffDuty":
                            await DutyHandler.OffDuty(interaction, interaction.user.id)
                        break;

                        case "CheckDutyTime":
                            await DutyHandler.DutyTimeHandler(interaction, interaction.user.id)
                        break;

                        default:break;
                    }
                } else if (interaction.isStringSelectMenu()) {
                    switch (interaction.customId) {
                        case '':

                        break;

                        case '':

                        break;

                        case '':

                        break;

                        default:break;
                    }
                } else if (interaction.isModalSubmit()) {
                    switch (interaction.customId) {
                        case "UserLoginModal":
                            const PasswordAccountContent = interaction.fields.getTextInputValue('PasswordInput');
                            const Embed = await new EmbedCreator(client, interaction)

                            let UserDetail = await UserManagement.Login(interaction, client, interaction.user.id, PasswordAccountContent)

                            const EmbedMessage = await Embed.ReturnDefault(Colors.Green, `Hello Again ${UserDetail.UserName}`, `You Can See Your Accounts Info Here.\n\n\`📧\`Email: **${UserDetail.UserEmail}**,\n\`📞\`Phone Number: **${UserDetail.UserNumber}**,\n\`🔑\`Password: ||${UserDetail.UserPassword}||.\n\n\nYou Can See Your Accounts Point Info Here.\n\`✅\`Current Points: **${UserDetail.UserCurrentPoint}**,\n\`➖\`Removed Points: **${UserDetail.UserRemovedPoint}**,\n\`💠\`All Points: **${UserDetail.UserAllPoint}**.`)

                            interaction.reply({content: '✅ Account Shoma ba **Movafaghiyat** Sakhte Shod va Mitunid Dobare ab Click Kardan Rooye Button Zir ba Vared Kardan Password Etelaat Khod Ra Bebinid.', ephemeral: true, embeds:[EmbedMessage]})
                        break;

                        case "CreateUserModal":
                            const NameInputContent = interaction.fields.getTextInputValue('NameInput');
                            const EmailContent = interaction.fields.getTextInputValue('EmailInput');
                            const Password2AccountContent = interaction.fields.getTextInputValue('PasswordInput');
                            const PhoneNumberContent = interaction.fields.getTextInputValue('NumberInput');
                            const SendEmbed = await new EmbedCreator(client, interaction)

                            await UserManagement.Create(client, interaction, NameInputContent, EmailContent, PhoneNumberContent, Password2AccountContent, 0, 0, 0, 0)

                            const Embed2Message = await SendEmbed.ReturnDefault(Colors.Green, 'User Created', `Hello **${NameInputContent}**, You Can See Your Accounts Info Here.\n\`👤\`User Name: **${NameInputContent}**,\n\`📧\`Email: **${EmailContent}**,\n\`📞\`Phone Number: **${PhoneNumberContent}**,\n\`🔑\`Password: ||${Password2AccountContent}||.\n\n\nYou Can See Your Accounts Point Info Here.\n\`✅\`Current Points: **0**.`)

                            UserViewManager.OverWritePermission(client, interaction, [
                                {
                                    id: interaction.user.id,
                                    deny: [PermissionsBitField.Flags.ViewChannel],
                                },
                            ]).then(e => {
                                UserViewManager.OverWritePermissionForSelectedChannell(client, interaction, Config.Main.LoginPanelChannel, [
                                    {
                                        id: interaction.user.id,
                                        allow: [PermissionsBitField.Flags.ViewChannel],
                                    },
                                ]).then(e => {
                                    interaction.reply({content: `✅ Account Shoma ba **Movafaghiyat** Sakhte Shod va Mitunid Ba Raftan Be Channel <#${Config.Main.LoginPanelChannel}>`, embeds: [Embed2Message], ephemeral: true})
                                    client.users.send(interaction.user.id, {content: `✅ Account Shoma ba **Movafaghiyat** Sakhte Shod va Mitunid Ba Raftan Be Channel <#${Config.Main.LoginPanelChannel}>`, embeds: [Embed2Message]})
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        break;

                        default:break;
                    }
                }
            });
        } catch (error) {
            Messages.Error('EventHandler => Interaction Create', error)
        }
    }

    static LoadEvents(client, Events, ActivityType) {
        try {
            this.InteractionCreate(client, Events)
            this.ClientReady(client, Events, ActivityType)
            this.WelcomeMessageHandler(client, Events)
            CrashHandler.Load()
        } catch (error) {
            Messages.Error('EventHandler => Load Events', error)
        }
    }
}