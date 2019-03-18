import React, { Fragment } from 'react'
import { Cart, openCart } from '../../dist'

export default class TestPage extends React.Component {
	render() {
		return (
			<Fragment>
				<Cart
					infoWebhook='/.netlify/functions/info'
					orderWebhook='/.netlify/functions/order'
				/>
				<button onClick={openCart}>Open Cart</button>
			</Fragment>
		)
	}
}