import productsState from '../state/products'
import decreaseQuantity from './decrease-quantity'

export default function addQuantityModification(newModification) {
	/*
	{
		id: `TESTA`,
		availble: `5`,
	}
	*/
	if(!newModification) return
	productsState.state.products.forEach(({ id, quantity }) => {
		const mod = search(id, newModification)
		if (mod && mod.availble < quantity) {
			decreaseQuantity(id, quantity - mod.availble, true)
		}
	})
}

function search(key, arr){
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id === key) {
			return arr[i]
		}
	}
	return false
}