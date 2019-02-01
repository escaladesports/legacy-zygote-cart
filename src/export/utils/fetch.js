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
import config from '../zygote.config'

let headers = {}
try {
	headers = require(`../../../headers`)
} catch (e) {
	// no headers, no problem
}

export default async function fetchWebhook(path, body) {
	if(body.event){
		triggerEvent(`${body.event}Attempt`, body)
	}
	let response, info, preFetchData
	try {
		info = {
			...body,
			products: productsState.state.products,
			selectedShippingMethod: shippingState.state.selected,
			totals: totalsState.state,
			meta: metaState.state.meta,
		}

		preFetchData = info
		for (let i = 0; i < config.plugins.length; i++) {
			preFetchData = await (body.event == `info` && typeof config.plugins[i].preInfo === `function` ? config.plugins[i].preInfo({preFetchData, info}) : preFetchData)
			preFetchData = await (body.event == `order` && typeof config.plugins[i].preOrder === `function` ? config.plugins[i].preOrder({preFetchData, info}) : preFetchData)
		}

		if (preFetchData.billingCardNumber) {
			preFetchData = preFetchData.replace(` `, ``)
		}

		const jsonBody = JSON.stringify(preFetchData)

		console.log(`Sending to API:`, jsonBody)
		if (path) {
			response = await fetch(path, {
				method: `post`,
				body: jsonBody,
				headers: headers,
			})
			response = await response.json()
		}
		else {
			console.warn(`No 'path' was provided for event '${body.event}'. Please fix this, unless the call is handled via a plugin.`)
			response = preFetchData
		}
		
		for (let i = 0; i < config.plugins.length; i++) {
			response = await (body.event == `info` && typeof config.plugins[i].postInfo === `function` ? config.plugins[i].postInfo({response, info, preFetchData}) : response)
			response = await (body.event == `order` && typeof config.plugins[i].postOrder === `function` ? config.plugins[i].postOrder({response, info, preFetchData}) : response)
		}
		console.log(`Received from API:`, response)
	}
	catch(err){
		console.error(err)
		triggerEvent(`error`, err)
		response = {}
	}
	try {
		if (body.event) {
			const eventData = {
				...body,
				...response,
			}
			if (response.success === true) {
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
			modifications,
			quantityModifications,
		} = response

		if (modifications) {
			addTotalModification(modifications)
		}
		if (quantityModifications) {
			addQuantityModification(quantityModifications)
		}
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
			if (typeof selectedShippingMethod == `object` && Object.keys(selectedShippingMethod).length > 0) {
				Object.keys(selectedShippingMethod).map(shipid => setShipping(selectedShippingMethod[shipid], shipid))
			}
			else {
				setShipping(selectedShippingMethod)
			}
		}
		else {
			for (let i = 0; i < config.plugins.length; i++) {
				const ship = await (typeof config.plugins[i].getShippingMethods === `function` ? config.plugins[i].getShippingMethods({response, info, preFetchData}) : {})
				if (ship && ship.methods && ship.methods.length) {
					shippingState.setState({
						methods: ship.methods,
						selected: ship.selected ? ship.selected : selectedShippingMethod,
					})
					if (ship.selected) {
						setShipping(ship.selected)
					}
				}
			}
		}
		if (step) {
			stepState.setState({ step })
		}
	}
	catch(err){
		console.error(err)
	}

	return response
}