import { PermissionsBitField, ChannelType, Colors, ActionRowBuilder } from "discord.js";
import GetTicketNumber from "../../Modules/TicketNumber.js";
import Database from "../Database/Database.js";
import EmbedCreator from "../Embed/EmbedCreator.js";
import * as discordTranscripts from "discord-html-transcripts"
import ButtonCreator from "../Button/ButtonCreator.js";
import Messages from "../Messages/Messages.js";


const Data = new Database();
const Timestamp = parseInt(new Date() / 1000)

let GlobalInteraction;
let GlobalClient;
let CurrentTicketNumber;
export default class Ticket {
    constructor(client, interaction) {
        this.client = client;
        this.interaction = interaction;
    }

    async Create(interaction, client, SupportRoleID, SupportRoleMessage) {
        try {

            GlobalInteraction = await this.interaction
            GlobalClient = await this.client

            const Embed = new EmbedCreator(client, interaction)

            let Setting = await Data.GetTicketSetting(interaction)

            await this.Count()

            interaction.guild.channels.create({
                name: await `ticket-${CurrentTicketNumber}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.AttachFiles,
                            PermissionsBitField.Flags.EmbedLinks,
                            PermissionsBitField.Flags.AddReactions,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendVoiceMessages
                        ],
                    },

                    {
                        id: SupportRoleID,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.AttachFiles,
                            PermissionsBitField.Flags.EmbedLinks,
                            PermissionsBitField.Flags.AddReactions,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendVoiceMessages
                        ],
                    },

                    {
                        id: interaction.guild.roles.everyone,
                        deny: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.AttachFiles,
                            PermissionsBitField.Flags.EmbedLinks,
                            PermissionsBitField.Flags.AddReactions,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ],
                    }
                ],
                parent: Setting.CategoryID,
                topic: `User: <@${interaction.user.id}> Supporters: <@&${SupportRoleID}>`
            }).then(async function(Channel) {
                // Send Embed in Ticket Channel Has Been Created
                await Embed.Ticket(Channel.id, Colors.Green, 'Ticket', `Salam <@${interaction.user.id}> Lotfan Darkhast Khodetun ro inja Benevisid`, SupportRoleID, SupportRoleMessage)

                // Save data to Database
                let TicketID = (`${Channel.id}-${interaction.guild.id}`)
                Data.SetTicketDataSetting(interaction, client, Channel.id, Channel.name, interaction.user.id, TicketID, SupportRoleID, Timestamp)

                // Send Successfull Message To User When Ticket Has Been Created
                await interaction.reply({
                    content: `✅Salam <@${interaction.user.id}> Aziz, **Ticket Shoma** Dar Channel <#${Channel.id}> **ijad Shod**.`,
                    ephemeral: true
                })

            })
        } catch (error) {
            Messages.Error('Ticket => Create', error)
        }
    }

    async Delete(client, interaction) {
        try {
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = new EmbedCreator(client, interaction);
            const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const DeleteTicket = await Data.DeleteTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`)
            const Button = new ButtonCreator(client, interaction);
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

            // Check Member Permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

            // Send Message to Ticket Channel After Channel Deleted
            const DeleteEmbedMessage = await Embed.ReturnDefault(Colors.Red, 'Ticket Deleted', `🗑️ Ticket **${interaction.channel}** \`\`[${interaction.channel.name}]\`\`, Tavasot <@${interaction.user.id}> Delete Shod.`)
            interaction.reply({embeds: [DeleteEmbedMessage]})

            // Send Ticket Channel Message to Ticket User
            let User = interaction.guild.members.cache.get(TicketDataSetting.UserID)
            User.send({embeds: [DeleteEmbedMessage]}).catch(() => {return});

            // Send Ticket Log Message to Log Channel
            const TicketDeletedLog = await Embed.ReturnDefault(Colors.White, 'Ticket Delete Log', `Ticket: \`\`${interaction.channel.name}\`\`**,**\nDeleted By: ${interaction.user}**,**\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>** **.**`)
            const LogChannel = await client.channels.cache.get(ChannelSetting.LogChannel)
            await LogChannel.send({ embeds: [TicketDeletedLog] })

            const TicketChannelBeforDelete = await client.channels.cache.get(TicketDataSetting.ChannelID)

            // Send Transcript To Channel and Ticket User
            const TicketTranscript = await discordTranscripts.createTranscript(this.interaction.channel, {
                limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
                returnType: 'buffer', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
                filename: `${this.interaction.channel.name}.html`, // Only valid with returnType is 'attachment'. Name of attachment.
                saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                footerText: "{number} Payam Export Gerefte Shod", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
                poweredBy: false // Whether to include the "Powered by discord-html-transcripts" footer
            })

            // Import Embed Creato Class and Create Embed
            const TranscriptEmbed = await Embed.ReturnDefault(Colors.Orange, 'Ticket Transcript', `Shoma Mitavanid Transcript In Ticket Channel Dar Paiin in Payam Moshahede va Download Konid.\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>**.`)

            // Send Embed and Transcript to Ticket User
            await User.send({embeds: [TranscriptEmbed], files: [{
                attachment: TicketTranscript,
                name: `${this.interaction.channel.name}.html`
            }]})

            // Send Embed and Transcript to Ticket Channel
            await TicketChannelBeforDelete.send({embeds: [TranscriptEmbed], files: [{
                attachment: TicketTranscript,
                name: `${this.interaction.channel.name}.html`
            }]})

            // Send Delete Channel Warning to Channel Befor Deleting Channel
            await TicketChannelBeforDelete.send({
                content: `❌🗑️ In Channel ta 10 Sanie Digar Delete Mishavad`
            })

            await setTimeout(() => {
                interaction.channel.delete();
            }, 1000 * 10);

            await DeleteTicket
        } catch (error) {
            Messages.Error('Ticket => Delete', error)
        }
    }

    async Close(client, interaction) {
        try {
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = new EmbedCreator(client, interaction);
            const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const Button = new ButtonCreator(client, interaction);
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

            // Check Member Permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

            // Send Message to Ticket Channel After Channel Closed
            const CloseEmbedMessage = await Embed.ReturnDefault(Colors.Red, 'Ticket Closed', `❌ Ticket **${interaction.channel}** \`\`[${interaction.channel.name}]\`\`, Tavasot <@${interaction.user.id}> Baste Shod.`)
            interaction.reply({embeds: [CloseEmbedMessage]})

            // Send Ticket Channel Message to Ticket User
            let User = interaction.guild.members.cache.get(TicketDataSetting.UserID)
            User.send({embeds: [CloseEmbedMessage]}).catch(() => {return});

            // Send Ticket Log Message to Log Channel
            const TicketClosedLog = await Embed.ReturnDefault(Colors.White, 'Ticket Close Log', `Ticket: \`\`${interaction.channel.name}\`\`**,**\nClosed By: ${interaction.user}**,**\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>** **.**`)
            const LogChannel = await client.channels.cache.get(ChannelSetting.LogChannel)
            await LogChannel.send({ embeds: [TicketClosedLog] })

            // Modify Permissions
            interaction.channel.permissionOverwrites.set([
                {
                    id: TicketDataSetting.UserID,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                },
                {
                    id: TicketDataSetting.SupporterRoleID,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.SendVoiceMessages
                    ],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                }
            ]);

            // Rebuild Buttons After Ticket Has Been Closed
            let AfterCloseButtons = await Button.TicketAfterClose('ReOpenButton', 'Re Open', false, '🔃', 'DeleteButton', 'Delete', false, '🗑️', 'TranscriptButton', 'Transcript', false, '📝')
            let ButtonsAfterTicketClosed = await new ActionRowBuilder().addComponents([AfterCloseButtons.ReOpen, AfterCloseButtons.Delete, AfterCloseButtons.Transcript])
            interaction.message.edit({ components: [ButtonsAfterTicketClosed] })
        } catch (error) {
            Messages.Error('Ticket => Close', error)
        }
    }

    async ReOpen(client, interaction) {
        try {
            const Button = await new ButtonCreator(client, interaction)
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = await new EmbedCreator(client, interaction);
            const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

            // Check Member Permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

            // Set Button Values
            const TicketButtons = await Button.Ticket('CloseTicket', 'Close', false, '❌', 'LockTicket', 'Lock', false, '🔒')

            // Compile Button to a Action Row
            const ActionRowTicketCloseButton = await new ActionRowBuilder().addComponents(TicketButtons.Close, TicketButtons.Lock)

            // Rebuild Ticket Embed Buttons
            interaction.message.edit({ components: [ActionRowTicketCloseButton] })

            // Ticket Reopened Message
            const TicketReOpenedMessage = await Embed.ReturnDefault(Colors.Green, 'Ticket Re Opened', `🔃 **Ticket: ${interaction.channel} Re-Open Shod**\n👤**Action By: **${interaction.user.tag}`)

            // Send Ticket Message
            interaction.reply({
                embeds: [TicketReOpenedMessage]
            })

            // Send Ticket Log Message to Log Channel
            const TicketClosedLog = await Embed.ReturnDefault(Colors.White, 'Ticket Re-Open Log', `Ticket: \`\`${interaction.channel.name}\`\`**,**\nRe-Opened By: ${interaction.user}**,**\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>** **.**`)
            const LogChannel = await client.channels.cache.get(ChannelSetting.LogChannel)
            await LogChannel.send({ embeds: [TicketClosedLog] })

            // Modify Channel Settings
            interaction.channel.permissionOverwrites.set([

                {
                    id: TicketDataSetting.UserID,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.SendVoiceMessages
                    ],
                },
                {
                    id: TicketDataSetting.SupporterRoleID,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.SendVoiceMessages
                    ],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                }
            ]);
        } catch (error) {
            Messages.Error('Ticket => Re-Open', error)
        }
    }

    async Lock(client, interaction) {
        try {
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = new EmbedCreator(client, interaction);
            const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const Button = new ButtonCreator(client, interaction);
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

            // Check Member Permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })
    
            // Modify Channel Permissions
            interaction.channel.permissionOverwrites.set([
                {
                    id: TicketDataSetting.SupporterRoleID,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: TicketDataSetting.UserID,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                }
            ]);

            // Set Button Values
            const TicketButtons = await Button.Ticket('CloseTicket', 'Close', false, '❌', 'UnLockTicket', 'Un Lock', false, '🔓')

            // Compile Button to a Action Row
            const ActionRowTicketCloseButton = await new ActionRowBuilder().addComponents(TicketButtons.Close, TicketButtons.Lock)

            // Edit Current Embed Buttons
            interaction.message.edit({ components: [ActionRowTicketCloseButton] })

            // Ticket Locked Message
            const TicketLockedMessage = await Embed.ReturnDefault(Colors.Green, 'Ticket Ticket Locked', `🔒 **Ticket: ${interaction.channel} Lock Shod**\n👤**Action By: **${interaction.user.tag}`)

            // Send Ticket Message
            interaction.reply({
                embeds: [TicketLockedMessage]
            })

            // Send Ticket Log Message to Log Channel
            const TicketLockedLog = await Embed.ReturnDefault(Colors.White, 'Ticket Lock Log', `Ticket: \`\`${interaction.channel.name}\`\`**,**\nLocked By: ${interaction.user}**,**\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>** **.**`)
            const LogChannel = await client.channels.cache.get(ChannelSetting.LogChannel)
            await LogChannel.send({ embeds: [TicketLockedLog] })
        } catch (error) {
            Messages.Error('Ticket => Lock', error)
        }
    }

    async UnLock(client, interaction) {
        try {
            const TicketSetting = await new Ticket(client, interaction);
            const Embed = new EmbedCreator(client, interaction);
            const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
            const Button = new ButtonCreator(client, interaction);
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

            // Check Member Permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })
    
            // Modify Channel Permissions
            interaction.channel.permissionOverwrites.set([
                {
                    id: TicketDataSetting.SupporterRoleID,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: TicketDataSetting.UserID,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                }
            ]);

            // Set Button Values
            const TicketButtons = await Button.Ticket('CloseTicket', 'Close', false, '❌', 'LockTicket', 'Lock', false, '🔒')

            // Compile Button to a Action Row
            const ActionRowTicketUnlockButton = await new ActionRowBuilder().addComponents(TicketButtons.Close, TicketButtons.Lock)

            // Edit Current Embed Buttons
            interaction.message.edit({ components: [ActionRowTicketUnlockButton] })

            // Ticket Un Locked Message
            const TicketUnLockedMessage = await Embed.ReturnDefault(Colors.Green, 'Ticket Un Locked', `🔓 **Ticket: ${interaction.channel} Un Lock Shod**\n👤**Action By: **${interaction.user.tag}`)

            // Send Ticket Message
            interaction.reply({
                embeds: [TicketUnLockedMessage]
            })

            // Send Ticket Log Message to Log Channel
            const TicketUnLockedLog = await Embed.ReturnDefault(Colors.White, 'Ticket Un Lock Log', `Ticket: \`\`${interaction.channel.name}\`\`**,**\nUn Locked By: ${interaction.user}**,**\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>** **.**`)
            const LogChannel = await client.channels.cache.get(ChannelSetting.LogChannel)
            await LogChannel.send({ embeds: [TicketUnLockedLog] })
        } catch (error) {
            Messages.Error('Ticket => Unlock', error)
        }
    }

    async Transcript() {
        try {
            // Create Transcript
            const TicketTranscript = await discordTranscripts.createTranscript(this.interaction.channel, {
                limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
                returnType: 'buffer', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
                filename: `${this.interaction.channel.name}.html`, // Only valid with returnType is 'attachment'. Name of attachment.
                saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                footerText: "{number} Payam{s} Export Gerefte Shod", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
                poweredBy: false // Whether to include the "Powered by discord-html-transcripts" footer
            })

            // Import Embed Creato Class and Create Embed
            const Embed = new EmbedCreator(this.client, this.interaction)
            const TranscriptEmbed = await Embed.ReturnDefault(Colors.Orange, 'Ticket Transcript', `Shoma Mitavanid Transcript In Ticket Channel Dar Paiin in Payam Moshahede va Download Konid.\nDate & Time: **<t:${Timestamp}:T>** - **<t:${Timestamp}:d>**.`)

            // Send Embed and Transcript to Channel
            await this.interaction.reply({
                embeds: [TranscriptEmbed],
                files: [{
                    attachment: TicketTranscript,
                    name: `${this.interaction.channel.name}.html`
                }]
            })
        } catch (error) {
            Messages.Error('Ticket => Transcript', error)
        }
    }

    async Count() {
        try {
            await GetTicketNumber(this.interaction).then((e) => {
                CurrentTicketNumber = e
            })

            return CurrentTicketNumber
        } catch (error) {
            Messages.Error('Ticket => Count', error)
        }
    }

    async AddMember(client, interaction, UserID) {
        const Embed = new EmbedCreator(client, interaction);
        const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
        const Button = new ButtonCreator(client, interaction);
        const ChannelSetting = await Data.GetChannelSetting(interaction, client);
        const ChannelIsNotTicket = await Embed.ReturnDefault(Colors.Red, 'Channel Isn\'t a Ticket', 'Channel Yek **Ticket Nist**')
        const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

        // Check Member Permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

        // Check Channel is a Ticket Channel
        if (TicketDataSetting.TicketID !== `${interaction.channel.id}-${interaction.guild.id}`) return interaction.editReply({embeds: [ChannelIsNotTicket], ephemeral: true})

        // Modify Channel Permissions
        interaction.channel.permissionOverwrites.set([
            {
                id: UserID,
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AddReactions,
                    PermissionsBitField.Flags.ReadMessageHistory
                ],
            },
            {
                id: interaction.guild.roles.everyone,
                deny: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AddReactions,
                    PermissionsBitField.Flags.ReadMessageHistory
                ],
            }
        ]);
    }

    async RemoveMember(client, interaction, UserID) {
        const Embed = new EmbedCreator(client, interaction);
        const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
        const Button = new ButtonCreator(client, interaction);
        const ChannelSetting = await Data.GetChannelSetting(interaction, client);
        const ChannelIsNotTicket = await Embed.ReturnDefault(Colors.Red, 'Channel Isn\'t a Ticket', 'Channel Yek **Ticket Nist**')
        const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

        // Check Member Permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

        // Check Channel is a Ticket Channel
        if (TicketDataSetting.TicketID !== `${interaction.channel.id}-${interaction.guild.id}`) return interaction.editReply({embeds: [ChannelIsNotTicket], ephemeral: true})

        // Modify Channel Permissions
        interaction.channel.permissionOverwrites.set([
            {
                id: UserID,
                deny: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AddReactions,
                    PermissionsBitField.Flags.ReadMessageHistory
                ],
            },
            {
                id: interaction.guild.roles.everyone,
                deny: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.AttachFiles,
                    PermissionsBitField.Flags.EmbedLinks,
                    PermissionsBitField.Flags.AddReactions,
                    PermissionsBitField.Flags.ReadMessageHistory
                ],
            }
        ]);
    }

    async RenameTicket(client, interaction, NewName) {
        const Embed = await new EmbedCreator(client, interaction);
        const TicketDataSetting = await Data.GetTicketDataSetting(interaction, client, `${interaction.channel.id}-${interaction.guild.id}`);
        const Button = new ButtonCreator(client, interaction);
        const ChannelSetting = await Data.GetChannelSetting(interaction, client);
        const ChannelIsNotTicket = await Embed.ReturnDefault(Colors.Red, 'Channel Isn\'t a Ticket', 'Channel Yek **Ticket Nist**')
        const DontHavePermission = await Embed.ReturnDefault(Colors.Red, 'Can\'t Add User To Ticket', 'Shoma **Permission Kafi** Baraye **Add Kardan User** be Ticket Ra **Nadarid**.')

        // Check Member Permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.editReply({embeds: [DontHavePermission], ephemeral: true })

        // Check Channel is a Ticket Channel
        if (TicketDataSetting.TicketID !== `${interaction.channel.id}-${interaction.guild.id}`) return interaction.editReply({embeds: [ChannelIsNotTicket], ephemeral: true})

        await interaction.channel.setName(NewName).then((e) => {
            return e
        }).catch((err) => {
            console.log("Error while renaming ticket => "+err.message);
        })

    }
}