import React from 'react'
import { css } from 'emotion'
import { Subscribe } from 'statable'
import { Cart, openCart, addToCart } from '../export'
import { settingsState } from '../export/state'
// import { settingsState } from '../../dist/state'
// import { Cart, openCart, addToCart } from '../../dist'
import logo from '../img/logo.svg'

import * as standardPayment from '../export/plugins/zygote-plugin-standard-billing'

const exposeSettings = [
	`paypalAppId`,
	`paypalEnv`,
	`infoWebhook`,
	`orderWebhook`,
]

export default class HomePage extends React.Component {
	render() {
		return (
			<div>
				<div>
					<button onClick={openCart}>Open Cart</button>
				</div>
				<div>
					<button onClick={() => addToCart({
						id: `123abc`,
						name: `7.5' Covington Billiard Table`,
						image: `https://images.salsify.com/image/upload/s--5scl3VX0--/w_75,h_75,c_pad/g8gkpmmhuhqzrqxu6boh.jpg`,
						description: `Beautiful and refined, the 8' Minnesota Fats Covington Pool Table with Dur-A-Bond play bed will make a stunning centerpiece for your game room. Carved...`,
						price: 100000,
						shippable: true,
						quantity: 1,
					})}>7.5' Covington Billiard Table</button>
				</div>
				<div className={styles.editControls}>
					<Subscribe to={settingsState}>
						{state => {
							const els = []
							for (let i = 0; i < exposeSettings.length; i++) {
								const name = exposeSettings[i]
								const changeHandler = ({ target: { value } }) => {
									settingsState.setState({
										[name]: value,
									})
								}
								els.push(
									<div key={`control-${name}`}>
										<label>
											<span>{name}:</span>
											<input
												type='text'
												value={state[name]}
												onChange={changeHandler.bind(this)}
											/>
										</label>
									</div>
								)
							}
							return els
						}}
					</Subscribe>
				</div>

				<Cart
					header={<img className={styles.logo} src={logo} />}
					cartHeader={<div className={styles.header}>With FREE shipping!</div>}
					cartFooter={<div className={styles.footer}>* Free shipping, except Alaska and Hawaii</div>}

					stripeApiKey='pk_test_0EMVTB6nEzmrjGA0Fc0kyVOR'
					paypalAppId='AeLnykBc0v7TfaCiuBfWMgX-6nkcNSw_PXb_puQrPyAQPqrofapoYQWKU2YtYGrBoGnt7_66Za17eA-c'
					paypalEnv='sandbox'
					infoWebhook='/.netlify/functions/info-stripe'
					orderWebhook='/.netlify/functions/order-stripe'

					auth0ClientID='Wweg1YAs6kJquv9DcLSpmSNpaY6XPaX8'
					auth0Logout='http://localhost:8000/'
					auth0Domain='zygote-cart.auth0.com'
					auth0Theme={{
						primaryColor: `#00cfff`,
					}}
					auth0Options={{
						rememberLastLogin: false,
						auth: {
							redirect: false,
						},

					}}
					plugins={[
						standardPayment,
					]}
					// splitName={true}

					totalModifications={[
						{
							id: `shipping`,
							description: `Shipping`,
							displayValue: `-`,
						},
						{
							id: `tax`,
							description: `Tax`,
							displayValue: `-`,
						},
					]}
				/>


			</div>
		)
	}
}

const styles = {
	logo: css`
		max-width: 150px;
		margin: 0 30px;
	`,
	header: css`
		text-align: center;
		font-weight: bold;
		font-size: 1.3em;
	`,
	footer: css`
		margin-top: 30px;
		text-align: center;
		font-size: .9em;
	`,
	editControls: css`
		margin-top: 30px;
		div{
			margin-top: 5px;
		}
		span{
			display: inline-block;
			text-align: right;
			width: 150px;
			margin-right: 10px;
		}
		input{
			width: 300px;
		}
	`,
}

// export const query = graphql`
// 	query HomePage {
// 		allStripeSku {
// 			edges {
// 				node {
// 					id
// 					inventory {
// 						type
// 						quantity
// 					}
// 					price
// 					product {
// 						shippable
// 					}
// 				}
// 			}
// 		}
// 		allStripePlan {
// 			edges {
// 				node {
// 					id
// 					amount
// 				}
// 			}
// 		}
// 	}
// `