import state from './state'

// exports.onRouteUpdateDelayed = () => {
// 	state.setState({
// 		delayed: true,
// 	})
// }

// exports.onRouteUpdate = () => {
// 	state.setState({
// 		delayed: false,
// 	})
// }

exports.onClientEntry = function() {
	window.___emitter.on(`onDelayedLoadPageResources`, function() {
		state.setState({
			delayed: true,
		})
	})
	window.___emitter.on(`onPostLoadPageResources`, function() {
		state.setState({
			delayed: false,
		})
	})

}