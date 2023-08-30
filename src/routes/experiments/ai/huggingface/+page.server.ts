import { HfInference } from '@huggingface/inference'
import { HUGGINGFACE_KEY } from '$env/static/private'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const imgUrl = data.get('imgUrl')

		if (!imgUrl) {
			return fail(400, { imgUrl, missing: true })
		}

		const inference = new HfInference(HUGGINGFACE_KEY)

		const models = [
			{
				name: 'Salesforce/blip-image-captioning-large',
				url: 'https://huggingface.co/Salesforce/blip-image-captioning-large'
			},
			{
				name: 'nlpconnect/vit-gpt2-image-captioning',
				url: 'https://huggingface.co/nlpconnect/vit-gpt2-image-captioning'
			},
			{
				name: 'noamrot/FuseCap_Image_Captioning',
				url: 'https://huggingface.co/noamrot/FuseCap_Image_Captioning'
			}
		]

		const response = await fetch(imgUrl as string)
		const imageBlob = await response.blob()

		const inferencePromises = models.map(async (model) => {
			const result = inference.imageToText({
				data: imageBlob,
				model: model.name
			})
			return result.then((caption) => ({ modelName: model.name, caption }))
		})

		// Wait for all inference promises to complete
		const results = await Promise.all(inferencePromises)

		return { captions: results }
	}
} satisfies Actions
