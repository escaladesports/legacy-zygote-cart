import React from 'react'
import { css } from 'emotion'
import { Subscribe } from 'statable'
import { Cart, openCart, addToCart, settingsState } from '../export'
import logo from '../img/logo.svg'

const exposeSettings = [
	`paypalAppId`,
	`paypalEnv`,
	`infoWebhook`,
	`orderWebhook`,
]

export default class HomePage extends React.Component {
	render() {
		let products = this.props.data.allStripeSku.edges.map(edge => edge.node)
		let plans = this.props.data.allStripePlan.edges.map(edge => edge.node)
		return (
			<div>
				<div>
					<button onClick={openCart} >Open Cart</button>
				</div>
				<div>
					<button onClick={() => addToCart({
						id: products[0].id,
						name: `7.5' Covington Billiard Table`,
						image: `https://images.salsify.com/image/upload/s--5scl3VX0--/w_75,h_75,c_pad/g8gkpmmhuhqzrqxu6boh.jpg`,
						description: `Beautiful and refined, the 8' Minnesota Fats Covington Pool Table with Dur-A-Bond play bed will make a stunning centerpiece for your game room. Carved...`,
						price: products[0].price,
						stock: typeof products[0].inventory.quantity === `number`
							? products[0].inventory.quantity
							: null,
					})}>Add to Cart A</button>
				</div>
				<div>
					<button onClick={() => addToCart({
						id: products[1].id,
						name: `Raptor Table Tennis Racket`,
						image: `https://images.salsify.com/image/upload/s--7evRfexQ--/w_75,h_75,c_pad/qdppgggttnkespgpupdz.jpg`,
						description: `A short description.`,
						price: products[1].price,
						stock: typeof products[0].inventory.quantity === `number`
							? products[0].inventory.quantity
							: null,
					})}>Add to Cart B</button>
				</div>
				<div>
					<button onClick={() => addToCart({
						id: plans[0].id,
						type: `plan`,
						name: `STIGA Emoji One-Star Table Tennis Balls - Monthly Subscription`,
						image: `https://images.salsify.com/image/upload/s--ibaII9O1--/w_75,h_75,c_pad/tcuv43grz2uec6z5twln.jpg`,
						description: `Every month, you will recieve fresh emoji faces.`,
						price: plans[0].amount,
						stock: 2,
					})}>Add to Cart Plan A</button>
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
					paypalAppId='ATP-SVtvHjAfyOGdr_8RRXgizsofojJV32mMt3WRmf5ignVi1TZkA67UYwm5sAitwETQuEigH91w70_6'
					paypalEnv='sandbox'
					infoWebhook='/.netlify/functions/info-stripe'
					orderWebhook='/.netlify/functions/order-stripe'

					totalModifications={[
						{
							id: `shipping`,
							description: `Shipping`,
							displayValue: `FREE`,
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

export const query = graphql`
	query HomePage {
		allStripeSku {
			edges{
				node{
					id
					inventory{
						type
						quantity
					}
					price
				}
			}
		}
		allStripePlan {
			edges {
				node {
					id
					amount
				}
			}
		}
	}
`