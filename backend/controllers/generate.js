import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const postPrompt = async (req, res) => {
	const { prompt } = req.body
	openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ "role": "system", "content": "You take prompts and make them into up-beat social media posts as the user in 125 words or less." },
			{ "role": "user", "content": prompt },
		],
		max_tokens: 100,
	})
		.then((data) => {
			const text = data.data.choices[0].message.content
			if (text) {
				res.status(200).json({ success: true, data: text })
			} else {
				res.status(404).json({ success: false, data: "No choices" })
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ success: false, message: error.message })
		})
}

export const postComment = async (req, res) => {
	const { description } = req.body
	openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ "role": "system", "content": "You reply extremely positively to the prompt in 100 words or less." },
			{ "role": "user", "content": description },
		],
		max_tokens: 100,
	})
		.then((data) => {
			const text = data.data.choices[0].message.content
			if (text) {
				res.status(200).json({ success: true, data: text })
			} else {
				res.status(404).json({ success: false, data: "No choices" })
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ success: false, message: error.message })
		})
}