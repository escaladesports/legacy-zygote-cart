import fetch from 'isomorphic-fetch'
import metaState from '../state/meta'
import shippingState from '../state/shipping'
import productsState from '../state/products'
import totalsState from '../state/totals'
import displayError from './display-error'
import displayInfo from './display-info'
import addTotalModification from './add-total-modification'
import addQuantityModification from './quantity-modifications'
import setShipping from './set-shipping'
import triggerEvent from './trigger-event'
import stepState from '../state/step'

export default async function fetchWebhook(path, body) {
	if(body.event){
		triggerEvent(`${body.event}Attempt`, body)
	}
	let data
	try {
		const jsonBody = JSON.stringify({
			...body,
			products: productsState.state.products,
			selectedShippingMethod: shippingState.state.selected,
			totals: totalsState.state,
			meta: metaState.state.meta,
		})
		console.log(`Sending to API:`, jsonBody)
		data = await fetch(path, {
			method: `post`,
			body: jsonBody,
		})
		data = await data.json()

		console.log(`Received from API:`, data)
	}
	catch(err){
		console.error(err)
		triggerEvent(`error`, err)
		data = {}
	}
	try {
		if (body.event) {
			const eventData = {
				...body,
				...data,
			}
			if (data.success === true) {
				triggerEvent(`${body.event}`, eventData)
			}
			else {
				triggerEvent(`error`, eventData)
			}
		}

		const {
			meta,
			messages,
			shippingMethods,
			selectedShippingMethod = typeof shippingState.state.selected === `number`
				? shippingState.state.selected
				: 0,
			step,
		} = data

		addTotalModification(data.modifications)
		addQuantityModification(data.quantityModifications)

		if (typeof meta === `object`) {
			metaState.setState({ meta })
		}
		if (messages) {
			displayError(messages.error)
			displayInfo(messages.info)
		}
		if (shippingMethods) {
			shippingState.setState({
				methods: shippingMethods,
				selected: selectedShippingMethod,
			})
			setShipping(selectedShippingMethod)
		}
		if (step) {
			stepState.setState({ step })
		}
	}
	catch(err){
		console.error(err)
	}

	return data
}