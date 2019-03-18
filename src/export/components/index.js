import React from 'react'
import Cart from './cart'
import styles from '../styles'
import settingsState from '../state/settings'
import defaultStyles from '../styles/defaults'

export default class Zygote extends React.Component {
	static defaultProps = {
		styles: defaultStyles,
	}
	constructor(props) {
		super(props)
		settingsState.setState(props)
		if (!props.orderWebhook){
			console.warn(`No order webhook supplied`)
		}
	}
	render(){
		const { testing } = this.props

		return (
			<div className={this.props.styles ? styles(this.props.styles) : ``}>
				<Cart testing={testing} />
			</div>
		)
	}
}