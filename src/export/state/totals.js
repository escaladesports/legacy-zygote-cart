import { State } from 'statable'

const totalsState = new State({
	subtotal: 0,
	modifications: [],
	total: 0,
	loading: false,
})

export default totalsState