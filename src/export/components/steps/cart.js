import React, { Fragment } from 'react'
import { Subscribe } from 'statable'
import closeCart from '../../utils/close-cart'
import ProductList from '../product-list'
import Button from '../button'
import productsState from '../../state/products'
import Totals from '../totals'
import nextStep from '../../utils/next-step'
import CardList from '../card-list'
import settingsState from '../../state/settings'
import addedToCartState from '../../state/added-to-cart'
import AddedToCartMessage from '../added-to-cart-message'

export default class CartStep extends React.Component{
	render() {
		return (
			<Subscribe to={[productsState, addedToCartState, settingsState]}>
				{({ products }, { addedToCart }, {
					cartHeader,
					cartFooter,
					addedToCartMsg,
				}) => (
					<Fragment>
						{!!cartHeader && (
							<div className='zygoteCartHeader'>{cartHeader}</div>
						)}
						{!!products.length && !!addedToCart && (
							<div className='zygoteCartHeader'>{
								addedToCart &&
										addedToCartMsg || <AddedToCartMessage />
							}</div>
						)}
						<ProductList editable />
						{!products.length && (
							<div className='zygoteEmptyMsg'>Your cart is empty</div>
						)}
						{!!products.length && (
							<Fragment>
								<Totals />
								<div className='zygoteCardListWrapper'>
									<CardList />
								</div>
								<Button onClick={nextStep}>Place Order</Button>
							</Fragment>
						)}
						<Button secondary onClick={closeCart}>Continue Shopping</Button>
						{!!cartFooter && (
							<div className='zygoteCartFooter'>{cartFooter}</div>
						)}
					</Fragment>
				)}
			</Subscribe>
		)
	}
	static styles = () => ({
		'.zygoteCartHeader': {
			marginBottom: 20,
		},
		'.zygoteCartFooter': {
			marginTop: 20,
		},
		'.zygoteEmptyMsg': {
			textAlign: `center`,
			marginTop: 30,
			marginBottom: 30,
		},
		'.zygoteCardListWrapper': {
			textAlign: `center`,
		},
	})
}