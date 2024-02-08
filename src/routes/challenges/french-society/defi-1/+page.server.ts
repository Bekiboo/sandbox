import { fail } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'

const required = (field: string) => z.string().min(1, { message: `${field} is required` })

// define the form validation schema
const contactFormSchema = z.object({
	businessEmail: required('Business email').email({ message: 'Invalid email' }),
	subject: required('Subject'),
	message: required('Message')
		.min(10, { message: 'Message must be at least 10 characters long' })
		.max(500, { message: 'Message must be at most 500 characters long' })
})

export const load = async (event) => {
	const form = await superValidate(event, contactFormSchema)
	return { form }
}

export const actions = {
	submitContactForm: async (event) => {
		const form = await superValidate(event, contactFormSchema)
		const { businessEmail, subject } = form.data

		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		let displayedMessage = ''
		switch (subject) {
			case 'product-inquiry':
				displayedMessage = `Thanks for your question, we will send you an answer as soon as possible at ${businessEmail}.`
				break
			case 'technical-support':
				displayedMessage = `Thanks for your patience, we will contact you as soon as possible at ${businessEmail}.`
				break
			case 'media-inquiry':
				displayedMessage = `Thanks for your question, we will send you an answer as soon as possible at ${businessEmail}.`
				break
			case 'job-application':
				displayedMessage = `Thanks for your application, we will give you an answer as soon as possible at ${businessEmail}.`
				break
			case 'general-feedback':
				displayedMessage = `Thanks for your feedback, this is very important to us.`
				break
		}

		// set 2s timeout to simulate server processing
		await new Promise((resolve) => setTimeout(resolve, 2000))

		// return a success message
		return message(form, displayedMessage)
	}
}
