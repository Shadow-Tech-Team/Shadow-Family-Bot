import { SlashCommandBuilder } from "discord.js";
import OpenAI from "../../Classes/OpenAI/OpenAI.js"

export default {
	data: new SlashCommandBuilder()
	.setName('imagine')
	.setDescription('Imagine Whatever you want to be a picture')
	.addStringOption(prompt =>
		prompt.setName('prompt')
		.setDescription('Write your Imagination')
		.setRequired(true)
	)
    .addStringOption(model => 
        model.setName('model')
		.setDescription('Select Generation Mode')
		.setRequired(true)
        .addChoices(
            {
                name: "Photo Mode",
                value: "photo"
            },
            {
                name: "Art Mode",
                value: "art"
            },
            {
                name: "Drawing Mode",
                value: "drawing"
            },
        )
    ),
    async execute(interaction, client) {

        const ChatGPT = new OpenAI(client, interaction)

        const PromptMessage = interaction.options.getString('prompt');
        const PromptModel = interaction.options.getString('model')

        switch (PromptModel) {

            case "photo":
                ChatGPT.Imagine(PromptMessage, "photo")
            break;

            case "art":
                ChatGPT.Imagine(PromptMessage, "art")
            break;

            case "drawing":
                ChatGPT.Imagine(PromptMessage, "drawing")
            break;

            default:break;
        }

	},
};