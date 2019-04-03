import { State } from 'statable'

const defaults = {
	customer: {},
	metadataKey: ``,
	orders: [],
}

const customerState = new State({...defaults}, {
	reset(){
		this.setState({...defaults})
	},
})

export default customerState