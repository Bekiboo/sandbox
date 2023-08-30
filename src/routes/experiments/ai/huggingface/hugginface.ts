import { HfInference } from '@huggingface/inference'
import { HUGGINGFACE_KEY } from '$env/static/private'

const inference = new HfInference(HUGGINGFACE_KEY)

const model = 'nlpconnect/vit-gpt2-image-captioning'

const imageUrl = 'hf-test.avif'

const response = await fetch(imageUrl)
const imageBlob = await response.blob()

const result = await inference.imageToText({
	data: imageBlob,
	model
})

console.log(result)
