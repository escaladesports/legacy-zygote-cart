import { settingsState } from '../state'

export default function triggerPluginHook(type, data){
	console.log(`triggerPluginHook`)
	for (let i = 0; i < settingsState.state.plugins.length; i++) {
		if (typeof settingsState.state.plugins[i][`${type}`] === `function`) {
			settingsState.state.plugins[i][`${type}`](data)
		}
	}
}