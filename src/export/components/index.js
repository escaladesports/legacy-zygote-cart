import React from 'react'
import { injectGlobal } from 'emotion'

import Cart from './cart'
import styles from '../styles'
import settingsState from '../state/settings'
import defaultStyles from '../styles/defaults'

injectGlobal`
	body.zygoteOpen {
		overflow: hidden;
	}
	@media screen (max-with: 500px) {
		body.zygoteOpen {
			position: fixed;
		}
	}
	@media print {
		body.zygoteOpen {
			visibility: hidden;
		}
	}
`

export default class Zygote extends React.Component {
	static defaultProps = {
		styles: defaultStyles,
	}
	constructor(props) {
		super(props)
		this.state = {
			styles: { ...defaultStyles, ...props.styles },
		}
		settingsState.setState(props)
	}
	render(){
		return (
			<div className={this.state.styles ? styles(this.state.styles) : ``}>
				<Cart />
			</div>
		)
	}
}