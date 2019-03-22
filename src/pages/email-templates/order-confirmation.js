import React from 'react'
import Layout from '../../components/layouts/transactional-email'

export default class OrderConfirmationEmail extends React.Component {
	render() {
		return (
			<Layout>
				<h2>Your order has been received!</h2>
				<p>{`{{infoName}}`}, we've received your order and we're excited to send it to you. When your order ships, we'll send you another email with your tracking info.</p>
			</Layout>
		)
	}
}