import React, { Fragment } from 'react'
import { Cart, openCart } from '../../dist'

export default class TestPage extends React.Component {
	render() {
		return (
			<Fragment>
				<Cart />
				<button onClick={openCart}>Open Cart</button>
			</Fragment>
		)
	}
}