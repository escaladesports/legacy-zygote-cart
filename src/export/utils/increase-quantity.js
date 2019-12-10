import { productsState, settingsState } from '../state'
import calculateTotals from './calculate-totals'
import triggerEvent from './trigger-event'

export default function increaseQuantity(id, quantity = 1) {
	let products = [...productsState.state.products]
	let modifiedProduct
	for (let i = products.length; i--;) {
		const product = products[i]
		if (product.id === id) {
			modifiedProduct = product
			product.quantity += quantity
			if(typeof product.stock === `number`){
				if(product.quantity > product.stock){
					product.quantity = product.stock
				}
			}
			break
		}
	}
	productsState.setState({ products })
	calculateTotals()
	if(modifiedProduct){
		triggerEvent(`addProduct`, {
			...modifiedProduct,
			quantity,
		})
	}

	for (let i = 0; i < settingsState.state.plugins.length; i++) {
		if (typeof settingsState.state.plugins[i].increaseQuantity === `function`) {
			settingsState.state.plugins[i].increaseQuantity({ products, modifiedProduct })
		}
	}
}