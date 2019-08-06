import settingsState from '../state/settings'
import capitalize from './capitalize'
import productsState from '../state/products'
import totalsState from '../state/totals'
import metaState from '../state/meta'

export default function eventTrigger(type, data){
	const capType = capitalize(type)
	settingsState.state[`on${capType}`](data)
	const { ga, dataLayer } = global
	if (settingsState.state.googleAnalytics && ga){
		ga(`send`, {
			hitType: `event`,
			eventCategory: `Zygote`,
			eventAction: type,
		})
		if(type === `order`){
			const { products } = productsState.state
			const { total } = totalsState.state
			const { meta } = metaState.state
			ga(`require`, `ecommerce`)
			ga(`ecommerce:addTransaction`, {
				id: meta.orderId || `${Date.now()}`,
				revenue: total / 10,
				shipping: getValue(`shipping`),
				tax: getValue(`tax`),
			})
			products.forEach(prod => {
				ga(`ecommerce:addItem`, prod)
			})
			ga(`ecommerce:send`)
			ga(`ecommerce:clear`)
		}
	}
	if (settingsState.state.googleTagManager && dataLayer){
		dataLayer.push({
			event: `zygote${capType}`,
			...data,
		})
	}
}

function getValue(id){
	const { modifications } = totalsState.state
	for (let i = modifications.length; i--;){
		if(modifications[i].id === id){
			return modifications[i].value
		}
	}
	return 0
}