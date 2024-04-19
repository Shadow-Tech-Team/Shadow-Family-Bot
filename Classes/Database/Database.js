import Config from "../../Config/Config.json" assert { type: "json"}
import chalk from "chalk";
import { connect } from "mongoose";
import mysql from "mysql";
import Messages from "../Messages/Messages.js";
import AddPointToUser from "../../Modules/AddPointToUser.js";
import RemovePointFromUser from "../../Modules/RemovePointFromUser.js";
import RemoveDuplicate from "../../Modules/RemoveDuplicate.js";
import ConvertSecond from "../../Modules/ConvertSecond.js";

// Import Schemas
import Guild from "../../Schemas/Guild.js";
import TicketSetting from "../../Schemas/TicketSetting.js";
import TicketOptions from "../../Schemas/TicketOptions.js";
import Ticket from "../../Schemas/Ticket.js";
import GuildSetting from "../../Schemas/GuildSetting.js";
import UserSetting from "../../Schemas/UserSetting.js"
import UserDutyHandler from "../../Schemas/UserDutyHandler.js";
import Welcome from "../../Schemas/Welcome.js";

let Gangs = []

export default class Database {

    constructor(Username = "", Password = "") {
        this.Username = Username;
        this.Password = Password;
    }

    async Connect() {
        try {

            // Connect to the MongoDB server
            await connect(`mongodb+srv://${this.Username}:${encodeURIComponent(this.Password)}@mysticworldbot.cudb3qa.mongodb.net/shadowfamily`).then(() => {
                console.log(`[ Database ]: ${chalk.green('Mongo DB Connection Successfully Established!')}`)
            }).catch((e) => {
                console.log(`[ Database ]: ${chalk.red('Mongo DB Connection Problem!')}, Error Message: ${e}`)
            })

            // Conenct to the MySQL server
            if (Config.Options.MySQL == true) {
                const MySQLConnection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    database : 'plife'
                })

                MySQLConnection.connect(function(err) {
                    if (err) {
                        console.log(`[ Database ]: ${chalk.red(`${chalk.yellow('MySQL DB')} Connection Problem!`)}, Error Message: ${e}`)
                        return;
                    }
                    console.log(`[ Database ]: ${chalk.green(`${chalk.yellow('MySQL DB')} Connection Successfully Established!`)}`)
                })

                global.MySQL = MySQLConnection

                await setInterval(() => {
                    this.#GetWhitlistedGangs()
                }, 100)
            }

        } catch (error) {
            Messages.Error('Database => Connect', error)
        }
    }

    // MongoDB Functions Section

    async GuildData(interaction, client) {
        try {
            let GuildProfile = await Guild.findOne({ GuildID: interaction.guild.id });
            if (!GuildProfile) {
                GuildProfile = await new Guild({
                    GuildID: interaction.guild.id,
                    GuildName: interaction.guild.name,
                    GuildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "None"
                });

                await GuildProfile.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Data in Database')}, Error ==> ${e}.`)
                })

                await interaction.reply({
                    content: `**✅Guild Data Has Been Saved into Database**,\n Server Name: **${GuildProfile.GuildName}**,\n Server ID: **${GuildProfile.GuildID}**,\n Server Icon: **${GuildProfile.GuildIcon}**.`,
                    ephemeral: true
                })
            } else {
                await interaction.reply({
                    content: `**✅Guild Data**,\n Server Name: **${GuildProfile.GuildName}**,\n Server ID: **${GuildProfile.GuildID}**,\n Server Icon: **${GuildProfile.GuildIcon}**.`,
                    ephemeral: true
                })
            }
        } catch (error) {
            Messages.Error('Database => Guild Data', error)
        }
    }

    async SetTicketSetting(interaction, client, Category, EmbedTitle, EmbedDescription, EmbedColor, Channel) {
        try {
            let TicketSetup = await TicketSetting.findOne({ GuildID: interaction.guild.id });

            if (!TicketSetup) {
                TicketSetup = await new TicketSetting({
                    GuildID: interaction.guild.id,
                    Category: Category,
                    EmbedTitle: EmbedTitle,
                    EmbedDescription: EmbedDescription,
                    EmbedColor: EmbedColor,
                    Channel: Channel
                })

                await TicketSetup.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Data in Database')}, Error ==> ${e}.`)
                })
                await interaction.editReply({
                    content: `**✅Ticket Setting Data Has Been Saved into Database.**`,
                    ephemeral: true
                })
            } else {
                await interaction.editReply({
                    content: `**✅You Have Saved Ticket Setting Data Befor.**`,
                    ephemeral: true
                })
            }
        } catch (error) {
            Messages.Error('Database => Set Ticket Setting', error)
        }
    }

    async SetTicketOptions(interaction, client, Options) {
        try {
            let TicketOption = await TicketOptions.findOne({ GuildID: interaction.guild.id });

            if (!TicketOption) {
                TicketOption = await new TicketOptions({
                    GuildID: interaction.guild.id,
                    Option: Options
                })

                await TicketOption.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Data in Database')}, Error ==> ${e}.`)
                })
                await interaction.editReply({
                    content: `**✅Ticket Options Setting Data Has Been Saved into Database.**`,
                    ephemeral: true
                })
            } else {
                await interaction.editReply({
                    content: `**✅You Have Saved Ticket Options Setting Data Befor.**`,
                    ephemeral: true
                })
            }
        } catch (error) {
            Messages.Error('Database => Set Ticket Options', error)
        }
    }

    async SetTicketDataSetting(interaction, client, ChannelID, ChannelName, UserID, TicketID, SupporterRoleID, CreationDate) {
        try {
            let TicketDataSetting = await Ticket.findOne({ TicketID: TicketID });

            if (!TicketDataSetting) {
                TicketDataSetting = await new Ticket({
                    GuildID: interaction.guild.id,
                    ChannelID: ChannelID,
                    ChannelName: ChannelName,
                    UserID: UserID,
                    TicketID: TicketID,
                    SupporterRoleID: SupporterRoleID,
                    CreationDate: CreationDate
                })

                await TicketDataSetting.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Data in Database')}, Error ==> ${e}.`)
                })

            } else {
                console.log(`[ Database ]: ${chalk.red('Ticket Has Been Created Befor and Opened.')}, Error ==> ${e}.`)
            }
        } catch (error) {
            Messages.Error('Database => Set Ticket Data Setting', error)
        }
    }

    async SetChannelSetting(interaction, client, ContactUsLogsChannel, FeedbackUsChannel, Log) {
        try {
            let ChannelOptions = await GuildSetting.findOne({GuildID: interaction.guild.id})

            if (!ChannelOptions) {
                ChannelOptions = await new GuildSetting({
                    GuildID: interaction.guild.id,
                    ContactUsLogsChannel: ContactUsLogsChannel,
                    FeedbackUsChannel: FeedbackUsChannel,
                    Log: Log
                })

                await ChannelOptions.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Server Settings in Database')}, Error ==> ${e}.`)
                })

            } else {
                console.log(`[ Database ]: ${chalk.red('You Saved Server Settings Befor.')}.`)
            }
        } catch (error) {
            Messages.Error('Database => Set Channel Setting', error)
        }
    }

    async SetWelcomeSetting(interaction, client, ChannelID, WelcomeText) {
        try {
            let ChannelOptions = await Welcome.findOne({GuildID: interaction.guild.id})

            if (!ChannelOptions) {
                ChannelOptions = await new Welcome({
                    GuildID: interaction.guild.id,
                    ChannelID: ChannelID,
                    WelcomeText: WelcomeText
                })

                await ChannelOptions.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Welcome Settings in Database')}, Error ==> ${e}.`)
                })

            } else {
                console.log(`[ Database ]: ${chalk.red('You Saved Welcome Settings Befor.')}.`)
            }
        } catch (error) {
            Messages.Error('Database => Set Welcome Setting', error)
        }
    }

    async GetWelcomeSetting(interaction) {
        try {
            let WelcomeOptions = await Welcome.findOne({GuildID: interaction.guild.id})

            if (WelcomeOptions) {

                return {
                    GuildID: WelcomeOptions.GuildID,
                    ChannelID: WelcomeOptions.ChannelID,
                    WelcomeMessage: WelcomeOptions.WelcomeText
                }

            } else {
                console.log(`[ Database ]: ${chalk.red('You Don\'t Have Any Welcome Setting Data in Database.')}.`)
            }
        } catch (error) {
            Messages.Error('Database => Get Welcome Setting', error)
        }
    }

    async GetTicketSetting(interaction) {
        try {
            let TicketSetup = await TicketSetting.findOne({ GuildID: interaction.guild.id });

            if (!TicketSetup) {
                return new Error('You Don\'t Have Any Ticket Setting in Database')
            } else {
                return {
                    CategoryID: TicketSetup.Category,
                    EmbedTitle: TicketSetup.EmbedTitle,
                    EmbedDescription: TicketSetup.EmbedDescription,
                    EmbedColor: TicketSetup.EmbedColor,
                    Channel: TicketSetup.Channel,
                    TicketNumber: TicketSetup.TicketNumber
                }
            }
        } catch (error) {
            Messages.Error('Database => Get Ticket Setting', error)
        }
    }

    async GetTicketOptions(interaction) {
        try {
            let TicketOption = await TicketOptions.findOne({ GuildID: interaction.guild.id });

            if (!TicketOption) {
                return new Error('You Don\'t Have Any Ticket Options in Database')
            } else {
                return TicketOption.Option
            }
        } catch (error) {
            Messages.Error('Database => Get Ticket Options', error)
        }
    }

    async GetTicketDataSetting(interaction, client, TicketID) {
        try {
            let TicketDataSetting = await Ticket.findOne({ TicketID: TicketID });

            if (!TicketDataSetting) {
                return new Error('You Don\'t Have Any Ticket Data in Database')
            } else {
                return {
                    ChannelID: TicketDataSetting.ChannelID,
                    ChannelName: TicketDataSetting.ChannelName,
                    UserID: TicketDataSetting.UserID,
                    TicketID: TicketDataSetting.TicketID,
                    SupporterRoleID: TicketDataSetting.SupporterRoleID,
                    CreationDate: TicketDataSetting.CreationDate
                }
            }
        } catch (error) {
            Messages.Error('Database => Get Ticket Data Setting', error)
        }
    }

    async GetChannelSetting(interaction, client) {
        try {
            let ServerSetting = await GuildSetting.findOne({ GuildID: interaction.guild.id });

            if (!ServerSetting) {
                return new Error('You Don\'t Have Any Channel Setting in Database')
            } else {
                return {
                    ContactUsLogsChannel: ServerSetting.ContactUsLogsChannel,
                    FeedbackUsChannel: ServerSetting.FeedbackUsChannel,
                    LogChannel: ServerSetting.Log,
                    WelcomeChannel: ServerSetting.WelcomeChannel
                }
            }
        } catch (error) {
            Messages.Error('Database => Get Channel Setting', error)
        }
    }

    async DeleteTicketDataSetting(interaction, client, TicketID) {
        try {
            let TicketDataSetting = await Ticket.findOne({ TicketID: TicketID });

            if (!TicketDataSetting) {
                return new Error('You Don\'t Have Any Ticket Data in Database')
            } else {
                TicketDataSetting.deleteOne({})
            }
        } catch (error) {
            Messages.Error('Database => Delete Ticket Data Setting', error)
        }

    }

    // User Management Setting
    async CreateUser(interaction, client, UserID, UserName, UserEmail, UserNumber, UserPassword, UserPoint, UserCurrentPoint, UserRemovedPoint, UserAllPoint) {
        try {
            let CreateUser = await UserSetting.findOne({ UserID: UserID });

            if (!CreateUser) {
                CreateUser = await new UserSetting({
                    GuildID: interaction.guild.id,
                    UserID: UserID,
                    UserName: UserName,
                    UserEmail: UserEmail,
                    UserNumber: UserNumber,
                    UserPassword: UserPassword,
                    UserPoint: UserPoint,
                    UserCurrentPoint: UserCurrentPoint,
                    UserRemovedPoint: UserRemovedPoint,
                    UserAllPoint: UserAllPoint
                })

                await CreateUser.save().catch((e) => {
                    console.log(`[ Database ]: ${chalk.red('Failed to Save Data in Database')}, Error ==> ${e}.`)
                })
            }
        } catch (error) {
            Messages.Error('Database => CreateUser', error)
        }
    }

    async LoginUser(interaction, client, UserID, UserPassword) {
        try {
            let LoginUser = await UserSetting.findOne({ UserID: UserID, UserPassword: UserPassword });

            if (LoginUser) {
                return {
                    GuildID: LoginUser.GuildID,
                    UserID: LoginUser.UserID,
                    UserName: LoginUser.UserName,
                    UserEmail: LoginUser.UserEmail,
                    UserNumber: LoginUser.UserNumber,
                    UserPassword: LoginUser.UserPassword,
                    UserPoint: LoginUser.UserPoint,
                    UserCurrentPoint: LoginUser.UserCurrentPoint,
                    UserRemovedPoint: LoginUser.UserRemovedPoint,
                    UserAllPoint: LoginUser.UserAllPoint
                }
            }
        } catch (error) {
            Messages.Error('Database => LoginUser', error)
        }
    }

    async FetchUser(interaction, client, UserID) {
        try {
            let FetchUser = await UserSetting.findOne({ UserID: UserID });

            if (FetchUser) {
                return {
                    GuildID: FetchUser.GuildID,
                    UserID: FetchUser.UserID,
                    UserName: FetchUser.UserName,
                    UserEmail: FetchUser.UserEmail,
                    UserNumber: FetchUser.UserNumber,
                    UserPassword: FetchUser.UserPassword,
                    UserPoint: FetchUser.UserPoint,
                    UserCurrentPoint: FetchUser.UserCurrentPoint,
                    UserRemovedPoint: FetchUser.UserRemovedPoint,
                    UserAllPoint: FetchUser.UserAllPoint
                }
            }
        } catch (error) {
            Messages.Error('Database => FetchUser', error)
        }
    }

    async DeleteUser() {

    }

    async AddPoint(interaction, client, UserID, PointToAdd) {
        try {
            let GetUserData = await this.FetchUser(interaction, client, UserID)
            let UserCurrentPoint = await GetUserData.UserCurrentPoint
            await AddPointToUser(interaction, client, UserID, PointToAdd).then(e => {
                UserCurrentPoint = e
            })
            return {Point: UserCurrentPoint}
        } catch (error) {
            Messages.Error('Database => AddPointToUser', error)
        }
    }

    async RemovePoint(interaction, client, UserID, PointToRemove) {
        try {
            let GetUserData = await this.FetchUser(interaction, client, UserID)
            let UserCurrentPoint = await GetUserData.UserCurrentPoint
            await RemovePointFromUser(interaction, client, UserID, PointToRemove).then(e => {
                UserCurrentPoint = e
            })
            return {Point: UserCurrentPoint}
        } catch (error) {
            Messages.Error('Database => RemovePointFromUser', error)
        }
    }

    async SetPoint() {

    }

    async OnDutyTimeHandler(UserID, {userId: id, userName: Username, time: time}) {
        let GetCurrentDutyTime = await UserSetting.findOne({ UserID: UserID });
        let FinalOnDutyTime = await GetCurrentDutyTime.OnDutyTime.time + time
        await UserSetting.updateOne({UserID: UserID}, {OnDutyTime: {
            id: id,
            name: Username,
            time: FinalOnDutyTime
        }}, {returnOriginal: false})
    }

    async TotalOnDutyTime(UserID) {
        let GetCurrentDutyTime = await UserSetting.findOne({ UserID: UserID });
        let TotalOnDutyTime = await GetCurrentDutyTime.OnDutyTime.time

        let ConvertedTime = await ConvertSecond(TotalOnDutyTime)

        return `Total Time On-Duty Shoma ${ConvertedTime.Hours} Saat va ${ConvertedTime.Minutes} Daghighe va ${ConvertedTime.Seconds} Sanie ast.`
    }

    // MySQL Functions Section

    // Gang Laptop Section
    async GangLaptop(Action, GangName) {

        switch (Action) {
            case 'show':
                return await this.#GetWhitlistedGangs().then((GangNameArray) => {
                    return GangNameArray
                })
            break;

            case 'add':
                return this.#AddToWhitlistedGangs(GangName).then((Response) => {
                    return Response
                })
            break;

            case 'remove':
                return this.#RemoveFromWhitlistedGangs(GangName).then((Response) => {
                    return Response
                })
            break;

            default:break;
        }

    }

    async #GetWhitlistedGangs() {
        await MySQL.query('SELECT * from `laptop_gangs`', (err, sql, rows) => {
            if (err) {
                Messages.Error('Database => #GetWhitlistedGangs', err)
            } else {
                for (let i = 0; i < sql.length; i++) {
                    const element = sql[i];
                    Gangs.push(element.gang_name)
                    Gangs = RemoveDuplicate(Gangs)
                }
            }
        })

        return RemoveDuplicate(Gangs)
    }

    async #AddToWhitlistedGangs(GangName) {
        if (RemoveDuplicate(Gangs).includes(GangName)) return `Gang **${GangName}** Already Whitelisted.`
        await MySQL.query('INSERT into `laptop_gangs` SET ?', {gang_name: GangName}, (err, sql, rows) => {
            if (err) throw Messages.Error('Database => #AddToWhitlistedGangs', err)
        })
        return `Gang **${GangName}** Successfully Added to Database.`
    }

    async #RemoveFromWhitlistedGangs(GangName) {
        if (!RemoveDuplicate(Gangs).includes(GangName)) return `Gang **${GangName}** Not Exists in Whitlisted.`
        await MySQL.query(`DELETE FROM laptop_gangs WHERE gang_name = '${GangName}'`, (err, sql, rows) => {
            if (err) throw Messages.Error('Database => #RemoveFromWhitlistedGangs', err)
            Gangs.splice(Gangs.indexOf(GangName), 1)
        })
        return `Gang **${GangName}** Successfully Removed from Database.`
    }

}