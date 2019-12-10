import { productsState, settingsState } from '../state'
import calculateTotals from './calculate-totals'
import triggerEvent from './trigger-event'

export default function decreaseQuantity(id, quantity = 1, quantityModded = false) {
	let products = [...productsState.state.products]
	let removedProduct
	for (let i = products.length; i--;) {
		const product = products[i]
		if (product.id === id) {
			removedProduct = product
			product.quantity -= quantity
			if (!product.quantity) {
				product.quantity = 1
			}
			product.quantityModded = quantityModded
			if (typeof product.stock === `number`) {
				if (product.quantity > product.stock) {
					product.quantity = product.stock
				}
			}
			break
		}
	}
	productsState.setState({ products })
	calculateTotals()
	if (removedProduct){
		triggerEvent(`removeProduct`, {
			...removedProduct,
			quantity,
		})
	}
	
	for (let i = 0; i < settingsState.state.plugins.length; i++) {
		if (typeof settingsState.state.plugins[i].decreaseQuantity === `function`) {
			settingsState.state.plugins[i].decreaseQuantity({ products, removedProduct })
		}
	}
}