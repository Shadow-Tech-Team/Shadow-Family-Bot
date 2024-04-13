import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Events, Colors, PermissionsBitField } from "discord.js";
import EmbedCreator from "../Embed/EmbedCreator.js"
import Config from "../../Config/Config.json" assert { type: "json" };
import Database from "../Database/Database.js";
import Messages from "../Messages/Messages.js";
import UserManagement from "../UserManagement/UserManagement.js";
import UserViewManager from "../UserViewManager/UserViewManager.js";
const Data = new Database();
export default class ModalCreator {

    static async ContactUs(client, interaction, ModalName, EmailInput, MessageInput, InputLabel, DiscordAccountInput, ChannelID) {

        try {
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const SendEmbed = await new EmbedCreator(client)
            const ContactModal = new ModalBuilder()
                .setCustomId('ContactUsModal')
                .setTitle(ModalName);

            const NameInput = new TextInputBuilder()
                .setCustomId('NameInput')
                .setLabel(InputLabel)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(4)
                .setPlaceholder("ex: Arman Mohebrad");

            const DiscordAccount = new TextInputBuilder()
                .setCustomId('DiscordAccountInput')
                .setLabel(DiscordAccountInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(3)
                .setPlaceholder("ex: BiG ADLER#4557");

            const Email = new TextInputBuilder()
                .setCustomId('EmailInput')
                .setLabel(EmailInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(15)
                .setPlaceholder("ex: example@gmail.com");

            const Message = new TextInputBuilder()
                .setCustomId('MessageInput')
                .setLabel(MessageInput)
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMinLength(20)
                .setPlaceholder("ex: Man dar kharid item fortnite moshkel daram.");


            const NameInputRow = new ActionRowBuilder().addComponents(NameInput);
            const DiscordAccountRow = new ActionRowBuilder().addComponents(DiscordAccount);
            const EmailRow = new ActionRowBuilder().addComponents(Email);
            const MessageRow = new ActionRowBuilder().addComponents(Message);


            ContactModal.addComponents(NameInputRow, DiscordAccountRow, EmailRow, MessageRow);


            await interaction.showModal(ContactModal);

            client.on(Events.InteractionCreate, interaction => {
                if (interaction.isModalSubmit() && interaction.customId === "ContactUsModal") {
                    const NameInputContent = interaction.fields.getTextInputValue('NameInput');
                    const EmailContent = interaction.fields.getTextInputValue('EmailInput');
                    const MessageContent = interaction.fields.getTextInputValue('MessageInput');
                    const DiscordAccountContent = interaction.fields.getTextInputValue('DiscordAccountInput');

                    SendEmbed.ContactEmbedLog(ChannelSetting.ContactUsLogsChannel, 'New Contact Message', `👤 Username: **${NameInputContent}**.\n📱 Discord Username: **${DiscordAccountContent}**.\n📧 Email: **${EmailContent}**.\n📜 Message: **${MessageContent}**`)
                    interaction.reply({content: '✅ Payam Shoma ba **Movafaghiyat** Ersal Shod va dar **Entezar Barresi** Ast.', ephemeral: true})
                };
            });
        } catch (error) {
            Messages.Error('ModalCreator => Contact Us', error)
        }

    }

    static async Feedback(client, interaction, ModalName, ProductInput, MessageInput, InputLabel, DiscordAccountInput, ChannelID) {

        try {
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const SendEmbed = await new EmbedCreator(client)
            const ContactModal = new ModalBuilder()
                .setCustomId('FeedbackModal')
                .setTitle(ModalName);

            const NameInput = new TextInputBuilder()
                .setCustomId('NameInput')
                .setLabel(InputLabel)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(4)
                .setPlaceholder("ex: Arman Mohebrad");

            const DiscordAccount = new TextInputBuilder()
                .setCustomId('DiscordAccountInput')
                .setLabel(DiscordAccountInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(3)
                .setPlaceholder("ex: BiG ADLER#4557");

            const Product = new TextInputBuilder()
                .setCustomId('ProductInput')
                .setLabel(ProductInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(15)
                .setPlaceholder("ex: Battle pass Fortnite");

            const Message = new TextInputBuilder()
                .setCustomId('MessageInput')
                .setLabel(MessageInput)
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMinLength(20)
                .setPlaceholder("Inja Nazaretoon ro benevisid");


            const NameInputRow = new ActionRowBuilder().addComponents(NameInput);
            const DiscordAccountRow = new ActionRowBuilder().addComponents(DiscordAccount);
            const ProductRow = new ActionRowBuilder().addComponents(Product);
            const MessageRow = new ActionRowBuilder().addComponents(Message);


            ContactModal.addComponents(NameInputRow, DiscordAccountRow, ProductRow, MessageRow);


            await interaction.showModal(ContactModal);

            client.on(Events.InteractionCreate, interaction => {
                if (interaction.isModalSubmit() && interaction.customId === "FeedbackModal") {
                    const NameInputContent = interaction.fields.getTextInputValue('NameInput');
                    const ProductContent = interaction.fields.getTextInputValue('ProductInput');
                    const MessageContent = interaction.fields.getTextInputValue('MessageInput');
                    const DiscordAccountContent = interaction.fields.getTextInputValue('DiscordAccountInput');

                    SendEmbed.FeedbackEmbedLog(ChannelSetting.FeedbackUsChannel, 'Our Customers Feedback', `👤 Username: **${NameInputContent}**.\n📱 Discord Username: **${DiscordAccountContent}**.\n🎁 Product: **${ProductContent}**.\n📜 Message: **${MessageContent}**`)
                    interaction.reply({content: `✅ Payam Shoma ba **Movafaghiyat** dar Channel <#${Config.Main.FeedbackUsChannel}> Ersal Shod.`, ephemeral: true})
                };
            });
        } catch (error) {
            Messages.Error('ModalCreator => Feedback Us', error)
        }

    }

    static async CreateUser(client, interaction, ModalName, EmailInput, InputLabel, PasswordInput, NumberInput, ChannelID) {

        try {
            const ChannelSetting = await Data.GetChannelSetting(interaction, client)
            const CreateUserModal = new ModalBuilder()
                .setCustomId('CreateUserModal')
                .setTitle(ModalName);

            const NameInput = new TextInputBuilder()
                .setCustomId('NameInput')
                .setLabel(InputLabel)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(4)
                .setPlaceholder("ex: Arman Mohebrad");

            const PasswordAccountInput = new TextInputBuilder()
                .setCustomId('PasswordInput')
                .setLabel(PasswordInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(3)
                .setPlaceholder("ex: test123456");

            const Email = new TextInputBuilder()
                .setCustomId('EmailInput')
                .setLabel(EmailInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(15)
                .setPlaceholder("ex: example@gmail.com");

            const UserNumberInput = new TextInputBuilder()
                .setCustomId('NumberInput')
                .setLabel(NumberInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(11)
                .setMaxLength(11)
                .setPlaceholder("ex: 09123456789");

            const NameInputRow = new ActionRowBuilder().addComponents(NameInput);
            const PasswordAccountRow = new ActionRowBuilder().addComponents(PasswordAccountInput);
            const EmailRow = new ActionRowBuilder().addComponents(Email);
            const NumberRow = new ActionRowBuilder().addComponents(UserNumberInput)

            CreateUserModal.addComponents(NameInputRow, PasswordAccountRow, EmailRow, NumberRow);

            await interaction.showModal(CreateUserModal);
        } catch (error) {
            Messages.Error('ModalCreator => Create User', error)
        }

    }

    static async LoginUser(client, interaction, ModalName, PasswordInput, ChannelID) {

        try {
            const SendEmbed = await new EmbedCreator(client)
            const LoginUserModal = new ModalBuilder()
                .setCustomId('UserLoginModal')
                .setTitle(ModalName);

            const PasswordAccountInput = new TextInputBuilder()
                .setCustomId('PasswordInput')
                .setLabel(PasswordInput)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(3)
                .setPlaceholder("ex: test123456");

            const PasswordAccountRow = new ActionRowBuilder().addComponents(PasswordAccountInput);


            LoginUserModal.addComponents(PasswordAccountRow);


            await interaction.showModal(LoginUserModal);
        } catch (error) {
            Messages.Error('ModalCreator => Login User', error)
        }

    }

}
