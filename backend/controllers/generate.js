import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const postPrompt = async (req, res) => {
	const { prompt } = req.body
	console.log(prompt)
	openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ "role": "system", "content": "You take prompts and make them into up-beat social media posts as the user." },
			{ "role": "user", "content": prompt },
		],
		max_tokens: 100,
	})
		.then((data) => {
			// console.log(data)
			// console.log(data.data.choices[0].text)
			// const text = data.data.choices[0].text
			// const text = data.data.choices[0].message
			console.log(data.data.choices[0].message.content)
			// console.log(data.choices[0].message)
			const text = data.data.choices[0].message.content
			if (text) {
				res.status(200).json({ success: true, data: text })
			} else {
				res.status(404).json({ success: false, data: "No choices" })
			}
			// if (data) {
			// res.status(200).json({ success: true, data: data[0] })
			// } else {
			// 	res.status(404).json({ success: false, data: "User not found" })
			// }
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ success: false, message: error.message })
		})
}