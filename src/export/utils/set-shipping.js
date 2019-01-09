import shippingState from '../state/shipping'
import totalsState from '../state/totals'
import addTotalModification from './add-total-modification'
import config from '../zygote.config'

export default function setShipping(selected, setId) {
	const method = findShippingMethod(selected)
	if(!method) return
	if (setId){
		const selectedSet = shippingState.state.selected
		selectedSet[setId] = selected
		shippingState.setState({ selected: selectedSet })
	}
	else {
		shippingState.setState({ selected })
	}
	totalsState.setState({ loading: true })
	addTotalModification({
		id: setId ? `shipping-${setId}` : `shipping`,
		description: method.description,
		displayValue: method.displayValue,
		value: method.value,
	})
	config.plugins.forEach(plugin => {
		if (typeof plugin.calculateTax === `function` ) {
			plugin.calculateTax({
				shippingAddress: shippingState.state.address,
				subtotal: totalsState.state.subtotal,
				shipping: method.value,
				discounts: 0,
			})
				.then(tax => {
					if (tax.id) addTotalModification(tax)
				})
				.catch(error => console.log(`Error applying taxes to new shipping method`, error))
		}
	})
	totalsState.setState({ loading: false })
}

function findShippingMethod(id){
	const { methods } = shippingState.state
	for (let i = methods.length; i--;){
		const method = methods[i]
		if (method.shippingMethods){
			for(let i = method.shippingMethods.length; i--;){
				const innerMethod = method.shippingMethods[i]
				if (innerMethod.id === id) {
					return innerMethod
				}
			}
		}
		else {
			if (method.id === id) {
				return method
			}
		}
	}
	return false
}