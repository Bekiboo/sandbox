import { HfInference } from '@huggingface/inference'
import { HUGGINGFACE_KEY } from '$env/static/private'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'

const models = [
	'Salesforce/blip-image-captioning-large',
	'nlpconnect/vit-gpt2-image-captioning',
	'noamrot/FuseCap_Image_Captioning'
]

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const imgUrl = data.get('imgUrl')

		if (!imgUrl) {
			return fail(400, { imgUrl, missing: true })
		}

		const inference = new HfInference(HUGGINGFACE_KEY)

		const response = await fetch(imgUrl as string)
		const imageBlob = await response.blob()

		const inferencePromises = models.map(async (model) => {
			const result = await inference.imageToText({
				data: imageBlob,
				model: model // Use the current model's name
			})
			return { model, caption: result }
		})

		// Wait for all inference promises to complete
		const results = await Promise.all(inferencePromises)

		return { results }
	}
} satisfies Actions
