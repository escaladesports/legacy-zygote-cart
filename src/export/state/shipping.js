import { State } from 'statable'

const defaults = {
	selected: false,
	loading: false,
	methods: [],
	address: {},
}

const shippingState = new State({...defaults}, {
	reset(){
		this.setState({...defaults})
	},
})

export default shippingState