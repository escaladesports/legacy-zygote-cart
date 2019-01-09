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

export default async function fetchWebhook(path, body) {
	if(body.event){
		triggerEvent(`${body.event}Attempt`, body)
	}
	let data, reqData, apiData
	try {
		reqData = {
			...body,
			products: productsState.state.products,
			selectedShippingMethod: shippingState.state.selected,
			totals: totalsState.state,
			meta: metaState.state.meta,
		}

		apiData = reqData
		for (let i = 0; i < config.plugins.length; i++) {
			apiData = await (body.event == `info` && typeof config.plugins[i].preInfo === `function` ? config.plugins[i].preInfo({apiData, reqData}) : apiData)
			apiData = await (body.event == `order` && typeof config.plugins[i].preOrder === `function` ? config.plugins[i].preOrder({apiData, reqData}) : apiData)
		}

		const jsonBody = JSON.stringify(apiData)

		console.log(`Sending to API:`, jsonBody)
		data = await fetch(path, {
			method: `post`,
			body: jsonBody,
		})
		data = await data.json()
		
		for (let i = 0; i < config.plugins.length; i++) {
			data = await (body.event == `info` && typeof config.plugins[i].postInfo === `function` ? config.plugins[i].postInfo({data, reqData, apiData}) : data)
			data = await (body.event == `order` && typeof config.plugins[i].postOrder === `function` ? config.plugins[i].postOrder({data, reqData, apiData}) : data)
		}

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
		else {
			for (let i = 0; i < config.plugins.length; i++) {
				const ship = await (typeof config.plugins[i].getShippingMethods === `function` ? config.plugins[i].getShippingMethods({data, reqData, apiData}) : {})
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

	return data
}