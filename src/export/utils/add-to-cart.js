import { productsState, stepState, addedToCartState, settingsState } from '../state'
import openCart from './open-cart'
import calculateTotals from './calculate-totals'
import triggerEvent from './trigger-event'

export default function addToCart(newProduct){
	let products = [...productsState.state.products]
	if (!newProduct.quantity){
		newProduct.quantity = 1
	}
	let alreadyInCart = false
	let shippable = products.length ? false : newProduct.shippable
	for (let i = products.length; i--;){
		const product = products[i]
		if (product.id === newProduct.id) {
			alreadyInCart = true
			products[i] = {
				...newProduct,
				quantity: products[i].quantity + newProduct.quantity,
			}
		}
		shippable = (shippable || product.shippable || newProduct.shippable)
	}
	if(!alreadyInCart){
		products.push(newProduct)
	}
	if(!newProduct.noOpen){
		openCart(true)
	}
	productsState.setState({ products, shippable })
	if (!shippable) {
		stepState.setState({ skip: { ...stepState.state.skip, shipping: true } })
	}
	else {
		let skip = stepState.state.skip
		delete skip[`shipping`]
		stepState.setState({ skip })
	}

	calculateTotals()
	addedToCartState.setState({ addedToCart: true })
	triggerEvent(`addProduct`, newProduct)

	for (let i = 0; i < settingsState.state.plugins.length; i++) {
		if (typeof settingsState.state.plugins[i].addToCart === `function`) {
			settingsState.state.plugins[i].addToCart({ products, newProduct })
		}
	}
}