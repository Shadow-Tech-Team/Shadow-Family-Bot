import { SlashCommandBuilder } from "discord.js";
import OpenAI from "../../Classes/OpenAI/OpenAI.js"


export default {
	data: new SlashCommandBuilder()
	.setName('ask-gpt')
	.setDescription('Ask Chat Question From Chat GPT')
	.addStringOption(question =>
		question.setName('question')
		.setDescription('Write your Question Here')
		.setRequired(true)
		),
		async execute(interaction, client) {

		const ChatGPT = new OpenAI(client, interaction)

		const Question = interaction.options.getString('question')

		ChatGPT.Answer(Question)
	},
};