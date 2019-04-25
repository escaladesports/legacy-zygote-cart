import messagesState from '../state/status-messages'
import productsState from '../state/products'
import decreaseQuantity from './decrease-quantity'
import removeFromCart from './remove-from-cart'
import displayInfo from './display-info'

export default function addQuantityModification(newModification) {
	/*
	{
		id: `TESTA`,
		available: `5`,
	}
	*/
	if(!newModification) return
	const remove = [...productsState.state.products]
	if (newModification === `all`) {
		remove.forEach(({ id, name }) => {
			removeFromCart(id)
			displayInfo(`"${name.replace(/&quot;/g,`"`)}" is no longer available for purchase and has been removed from your cart.`)
			messagesState.setState({ errors: [] })
		})
	}
	else {
		remove.forEach(({ id, quantity, name }) => {
			const mod = search(id, newModification)
			if (mod) {
				if (mod.available == 0) {
					removeFromCart(id)
					displayInfo(`"${name.replace(/&quot;/g,`"`)}" is no longer available for purchase and has been removed from your cart.`)
				}
				else if (mod.available < quantity) {
					decreaseQuantity(id, quantity - mod.available, true)
				}
			}
		})
	}
}

function search(key, arr){
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id === key) {
			return arr[i]
		}
	}
	return false
}