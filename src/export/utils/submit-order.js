import table from 'datasets-us-states-names-abbr'

import fetch from './fetch'
import { stepState, settingsState, productsState, totalsState, messagesState, metaState, shippingState, successState } from '../state'
import errorCheck from './error-check'
import getFormValues from './get-form-values'
import clearMessages from './clear-messages'
import validateAllInput from './validate-all-input'
import displayError from './display-error'
import { postSuccess } from '../components/auth0'

export default async function submitOrder({ type, token }) {
	clearMessages()
	if (!token) {
		validateAllInput()
	}

	await timeout()

	// Check for required fields
	if (errorCheck()) return
	stepState.setState({ processing: true })

	const body = getFormValues()
	body.billingStateAbbr = body.sameBilling ? table[body.shippingState] : table[body.billingState]

	if(type === `paypal`){
		body.paymentType = `paypal`
		body.payment = token
	}
	else if (settingsState.state.stripeApiKey && window.zygoteStripeInstance) {
		if(token && type === `stripe`){
			body.payment = token
		}
		else {
			// Get token from payment inputs
			const { token } = await (body.sameBilling // If shipping is the same as billing, use it instead
				? window.zygoteStripeInstance.createToken({
					name: body.infoName,
					address_line1: body.shippingAddress1,
					address_line2: body.shippingAddress2,
					address_city: body.shippingCity,
					address_state: body.shippingState,
					address_zip: body.shippingZip,
				})
				: window.zygoteStripeInstance.createToken({
					name: body.billingName,
					address_line1: body.billingAddress1,
					address_line2: body.billingAddress2,
					address_city: body.billingCity,
					address_state: body.billingState,
					address_zip: body.billingZip,
				}))
			body.payment = token
		}
		body.paymentType = `stripe`
	}
	else {
		body.paymentType = `standard`
	}

	body.products = productsState.state.products
	const {
		subtotal,
		modifications,
		total,
	} = totalsState.state
	body.totals = {
		subtotal,
		modifications,
		total,
	}
	body.event = `order`

	let data
	try {
		data = await fetch(settingsState.state.orderWebhook, body)
	}
	catch(err){
		data = {}
		console.error(err)
	}

	if (!data.success) {
		if (!messagesState.state.errors.length){
			displayError(settingsState.state.orderSubmitError)
		}
		if(data.returnTo){
			stepState.setState({ step: data.returnTo })
		}
		else {
			stepState.setState({ step: `payment` })
		}
	}
	else {
		for (let i = 0; i < settingsState.state.plugins.length; i++) {
			await (typeof settingsState.state.plugins[i].postSuccess === `function` ? settingsState.state.plugins[i].postSuccess({ 
				products: productsState.state.products,
				totals: {
					subtotal,
					modifications,
					total,
				},
				response: data,
			}) : null)
		}

		await postSuccess({ response: data })

		successState.setState({
			totals: {...totalsState.state},
			products: [...productsState.state.products],
			meta: {...metaState.state.meta},
		})
		stepState.setState({ step: `success`, vals: {} })
		totalsState.reset()
		productsState.reset()
		metaState.reset()
		shippingState.reset()
	}

	stepState.setState({ processing: false })
}

function timeout(n = 1){
	return new Promise((resolve) => {
		setTimeout(resolve, n)
	})
}