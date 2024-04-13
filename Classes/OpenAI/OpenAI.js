import { Configuration, OpenAIApi } from "openai";
import Config from "../../Config/Config.json" assert { type: "json" };
import { ClientV3 } from "craiyon"
import { AttachmentBuilder, Colors, EmbedBuilder } from "discord.js";
import Messages from "../Messages/Messages.js";

export default class OpenAI {
    constructor (client, interaction) {
        this.client = client;
        this.interaction = interaction
    }

    async Answer(Message) {

        try {
            const OpenAi = new OpenAIApi(new Configuration({
                apiKey: Config.OpenAI.OpenAiApiKey,
            }));

            await this.interaction.deferReply({ephemeral: true})

            const Response = await OpenAi.createChatCompletion({
                model: Config.OpenAI.Engine,
                max_tokens: 2084,
                temperature: 0.1,
                messages: [
                    {role: "system", content: "You are a helpful assistant who responds succinctly"},
                    {role: "user", content: String(Message)}
                ],
            });

            const ResponseContent = await Response.data.choices[0].message;

            await this.interaction.editReply({content: `🤖 Chat GPT Answer: **${ResponseContent.content}**`, ephemeral: true})

        } catch (err) {

            Messages.Error('OpenAI => Answer', err)

            console.log(`\nNew Error: OpenAi.js, Message => ${err.message}.\n`)

            await this.interaction.editReply({content: `New OpenAI Error: Request Failed => Status :**${err.response.status}**, Message: **${err.message}**`, ephemeral: true})

        }
    }

    async Imagine(PromptMessage, PromptModel) {
        try {

            await this.interaction.deferReply({ ephemeral: true });


            let Craiyon = new ClientV3().withMaxRetries(2)
            let CreateImage = await Craiyon.generate({
                prompt: PromptMessage,
                model: PromptModel
            })

            const ImageAttachment = await new AttachmentBuilder(CreateImage.images[0].asBuffer(), { name: 'image.png' });

            const Embed = await new EmbedBuilder()
                .setColor(Colors.Blue)
                .setImage(`attachment://image.png`)
                .setTitle(`Image Based On: \`${PromptMessage}\``)
                .setTimestamp();

            await this.interaction.editReply({
                content: '',
                embeds: [Embed],
                files: [ImageAttachment],
                ephemeral: true
            });

        } catch (err) {

            Messages.Error('OpenAI => Imagine', err)

            console.log(`\nNew Error: OpenAi.js, Message => ${err}.\n\n\n`)

            await this.interaction.editReply({content: `New OpenAI Error: Request Failed => Status :**${err.response}**, Message: **${err.message}**`, ephemeral: true})
        }
    }
}

