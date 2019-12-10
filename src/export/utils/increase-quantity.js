import { productsState } from '../state'
import triggerPluginHook from './trigger-plugin-hook'
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
	
	triggerPluginHook(`increaseQuantity`, { products, modifiedProduct })

}