// import React from 'react'
// import { css } from 'emotion'
// import { Subscribe } from 'statable'
// // import { Cart, openCart, addToCart } from '../export'
// // import { settingsState } from '../export/state'
// import { settingsState } from '../../dist/state'
// import { Cart, openCart, addToCart } from '../../dist'
// import logo from '../img/logo.svg'

// const exposeSettings = [
// 	`paypalAppId`,
// 	`paypalEnv`,
// 	`infoWebhook`,
// 	`orderWebhook`,
// ]

// export default class HomePageDist extends React.Component {
// 	render() {
// 		let products = this.props.data.allStripeSku.edges.map(edge => edge.node)
// 		let plans = this.props.data.allStripePlan.edges.map(edge => edge.node)
// 		return (
// 			<div>
// 				<div>
// 					<button onClick={openCart} >Open Cart</button>
// 				</div>
// 				<div>

// 					<button onClick={() => addToCart({
// 						id: products[1].id,
// 						name: `7.5' Covington Billiard Table`,
// 						image: `https://images.salsify.com/image/upload/s--5scl3VX0--/w_75,h_75,c_pad/g8gkpmmhuhqzrqxu6boh.jpg`,
// 						description: `Beautiful and refined, the 8' Minnesota Fats Covington Pool Table with Dur-A-Bond play bed will make a stunning centerpiece for your game room. Carved...`,
// 						price: products[1].price,
// 						shippable: products[1].product.shippable,
// 						stock: typeof products[1].inventory.quantity === `number`
// 							? products[1].inventory.quantity
// 							: null,
// 					})}>7.5' Covington Billiard Table</button>
// 				</div>
// 				<div>
// 					<button onClick={() => addToCart({
// 						id: products[2].id,
// 						name: `Raptor Table Tennis Racket`,
// 						image: `https://images.salsify.com/image/upload/s--7evRfexQ--/w_75,h_75,c_pad/qdppgggttnkespgpupdz.jpg`,
// 						description: `A short description.`,
// 						price: products[2].price,
// 						shippable: products[2].product.shippable,
// 						stock: typeof products[2].inventory.quantity === `number`
// 							? products[2].inventory.quantity
// 							: null,
// 					})}>Raptor Table Tennis Racket</button>
// 				</div>
// 				<div>
// 					<button onClick={() => addToCart({
// 						id: products[0].id,
// 						name: `$20.00 Red Cross Donation`,
// 						image: `https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_the_Red_Cross.svg`,
// 						description: `A short description.`,
// 						shippable: products[0].product.shippable,
// 						price: products[0].price,
// 						stock: typeof products[0].inventory.quantity === `number`
// 							? products[0].inventory.quantity
// 							: null,
// 					})}>$20.00 Red Cross Donation</button>
// 				</div>
// 				<div>
// 					<button onClick={() => addToCart({
// 						id: plans[0].id,
// 						type: `plan`,
// 						name: `STIGA Emoji One-Star Table Tennis Balls - Monthly Subscription`,
// 						image: `https://images.salsify.com/image/upload/s--ibaII9O1--/w_75,h_75,c_pad/tcuv43grz2uec6z5twln.jpg`,
// 						description: `Every month, you will recieve fresh emoji faces.`,
// 						price: plans[0].amount,
// 						stock: 2,
// 					})}>STIGA Emoji One-Star Table Tennis Balls - Monthly Subscription</button>
// 				</div>
// 				<div>
// 					<button onClick={() => addToCart({
// 						id: `35-7090-2`,
// 						name: `Microfiber Bean Bags with Tub`,
// 						image: `https://images.salsify.com/image/upload/s--ibaII9O1--/w_75,h_75,c_pad/tcuv43grz2uec6z5twln.jpg`,
// 						description: `Microfiber Bean Bags with Tub.`,
// 						price: 3499,
// 						shippable: true,
// 					})}>Microfiber Bean Bags with Tub</button>
// 				</div>
// 				<div>
// 					<button onClick={() => addToCart({
// 						id: `A08108`,
// 						name: `Safetyglass Arrows – 28"`,
// 						image: `https://images.salsify.com/image/upload/s--ibaII9O1--/w_75,h_75,c_pad/tcuv43grz2uec6z5twln.jpg`,
// 						description: `Safetyglass Arrows – 28".`,
// 						price: 32400,
// 						shippable: true,
// 					})}>Safetyglass Arrows – 28"</button>
// 				</div>

// 				<div className={styles.editControls}>
// 					<Subscribe to={settingsState}>
// 						{state => {
// 							const els = []
// 							for (let i = 0; i < exposeSettings.length; i++) {
// 								const name = exposeSettings[i]
// 								const changeHandler = ({ target: { value } }) => {
// 									settingsState.setState({
// 										[name]: value,
// 									})
// 								}
// 								els.push(
// 									<div key={`control-${name}`}>
// 										<label>
// 											<span>{name}:</span>
// 											<input
// 												type='text'
// 												value={state[name]}
// 												onChange={changeHandler.bind(this)}
// 											/>
// 										</label>
// 									</div>
// 								)
// 							}
// 							return els
// 						}}
// 					</Subscribe>
// 				</div>

// 				<Cart
// 					header={<img className={styles.logo} src={logo} />}
// 					cartHeader={<div className={styles.header}>With FREE shipping!</div>}
// 					cartFooter={<div className={styles.footer}>* Free shipping, except Alaska and Hawaii</div>}

// 					stripeApiKey='pk_test_0EMVTB6nEzmrjGA0Fc0kyVOR'
// 					paypalAppId='AeLnykBc0v7TfaCiuBfWMgX-6nkcNSw_PXb_puQrPyAQPqrofapoYQWKU2YtYGrBoGnt7_66Za17eA-c'
// 					paypalEnv='sandbox'
// 					infoWebhook='/.netlify/functions/info-stripe'
// 					orderWebhook='/.netlify/functions/order-stripe'

// 					auth0ClientID='Wweg1YAs6kJquv9DcLSpmSNpaY6XPaX8'
// 					auth0Logout='http://localhost:8000/'
// 					auth0Domain='zygote-cart.auth0.com'
// 					auth0Theme={{
// 						primaryColor: `#00cfff`,
// 					}}
// 					auth0Options={{
// 						rememberLastLogin: false,
// 						auth: {
// 							redirect: false,
// 						},
// 					}}

// 					splitName={true}

// 					totalModifications={[
// 						{
// 							id: `shipping`,
// 							description: `Shipping`,
// 							displayValue: `-`,
// 						},
// 						{
// 							id: `tax`,
// 							description: `Tax`,
// 							displayValue: `-`,
// 						},
// 					]}
// 				/>


// 			</div>
// 		)
// 	}
// }

// const styles = {
// 	logo: css`
// 		max-width: 150px;
// 		margin: 0 30px;
// 	`,
// 	header: css`
// 		text-align: center;
// 		font-weight: bold;
// 		font-size: 1.3em;
// 	`,
// 	footer: css`
// 		margin-top: 30px;
// 		text-align: center;
// 		font-size: .9em;
// 	`,
// 	editControls: css`
// 		margin-top: 30px;
// 		div{
// 			margin-top: 5px;
// 		}
// 		span{
// 			display: inline-block;
// 			text-align: right;
// 			width: 150px;
// 			margin-right: 10px;
// 		}
// 		input{
// 			width: 300px;
// 		}
// 	`,
// }

// export const query = graphql`
// 	query HomePageDist {
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

import React from 'react'

export const Dist = () => <div>Hello World</div>