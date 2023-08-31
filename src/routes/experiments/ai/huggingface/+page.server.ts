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

		let response

		try {
			response = await fetch(imgUrl as string)
		} catch (error) {
			console.log('error', error)

			return fail(400, { imgUrl, badUrl: true })
		}

		const imageBlob = await response.blob()

		let results
		try {
			const inferencePromises = models.map(async (model) => {
				const result = await inference.imageToText({
					data: imageBlob,
					model: model // Use the current model's name
				})
				return { model, caption: result }
			})

			// Wait for all inference promises to complete
			results = await Promise.all(inferencePromises)
		} catch (error) {
			console.log('error', error)

			return fail(400, { serverError: true })
		}

		return { results }
	}
} satisfies Actions
