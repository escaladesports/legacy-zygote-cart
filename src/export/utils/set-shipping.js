import shippingState, { findShippingMethod } from '../state/shipping'
import totalsState from '../state/totals'
import settingsState from '../state/settings'
import addTotalModification from './add-total-modification'

export default function setShipping(selected, setId) {
	const method = findShippingMethod(selected)
	if(!method) return
	if (setId && typeof shippingState.state.selected === `object`){
		const selectedSet = shippingState.state.selected
		selectedSet[setId] = selected
		shippingState.setState({ selected: selectedSet })
	}
	else {
		shippingState.setState({ selected })
	}
	totalsState.setState({ loading: true })
	addTotalModification({
		id: setId && typeof shippingState.state.selected === `object` ? `shipping-${setId}` : `shipping`,
		description: method.description,
		displayValue: method.displayValue,
		value: method.value,
	})

	const totalShippingCost = totalsState.state.modifications
		.filter(mod => mod.id.startsWith(`shipping`))
		.reduce((total, mod) => total.value ? total.value + mod.value : total + mod.value)

	let discount = 0
	totalsState.state.modifications.filter(mod => !mod.id.startsWith(`tax`) && !mod.id.startsWith(`shipping`)).forEach(mod => {
		discount += mod.value
	})

	const calcTax = async plugin => {
		const	subToShipState = async (shipState) => {
			try {
				console.log(`Inside Subscribe ship state`, shipState)
				const tax = await plugin.calculateTax({
					shippingAddress: shipState.address,
					subtotal: totalsState.state.subtotal,
					shipping: totalShippingCost.value ? totalShippingCost.value : totalShippingCost,
					discount,
				})

				if (tax.id) addTotalModification(tax)
			} catch(e){
				console.log(`Error applying taxes to new shipping method`, e)
			}
		}

		await shippingState.subscribe(subToShipState)
		shippingState.unsubscribe(subToShipState)
	}

	settingsState.state.plugins.forEach(async plugin => {
		if (typeof plugin.calculateTax === `function` && settingsState.state.tax) {
			calcTax()
		}
	})
	totalsState.setState({ loading: false })
}

