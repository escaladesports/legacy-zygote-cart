import { State } from 'statable'
import noop from '../utils/noop'

const settingsState = new State({
	shipping: true,
	tax: true,
	coupons: true,
	googleAnalytics: true,
	googleTagManager: true,
	stripeApiKey: ``,
	onOpen: noop,
	onClose: noop,
	onAddProduct: noop,
	onRemoveProduct: noop,
	onInfoAttempt: noop,
	onInfo: noop,
	onOrderAttempt: noop,
	onOrder: noop,
	onError: noop,
	orderSubmitError: `We're sorry! There was an error with the server. Your order was not placed. Please try again later.`,
	infoSubmitError: `We're sorry! There was an error with the server. Your information was not placed. Please try again later.`,
	splitName: false,
	testing: false,
	plugins: [],
	showStates: noop,
})

export default settingsState