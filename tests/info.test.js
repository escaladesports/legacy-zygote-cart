import React, { Fragment } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { Cart, addToCart } from '../dist'

const addItemToCart = () => {
	const utils = render(
		<Fragment>
			<Cart />
			<div>
				<button onClick={() => addToCart({
					id: `TESTA`,
					name: `Microfiber Bean Bags with Tub`,
					image: `https://images.salsify.com/image/upload/s--ibaII9O1--/w_75,h_75,c_pad/tcuv43grz2uec6z5twln.jpg`,
					description: `Microfiber Bean Bags with Tub.`,
					price: 3499,
					shippable: true,
				})}>Product</button>
			</div>
		</Fragment>
	)
	fireEvent.click(utils.getByText(/Product/i))
	return {
		...utils,
	}
}

afterEach(cleanup)

test(`Move to Details Step`, () => {
	const { getByText, getByTestId } = addItemToCart()
	fireEvent.click(getByText(/Place Order/i))
	expect(getByTestId(`info-step`)).toBeVisible()
	expect(getByTestId(`shipping-step`)).not.toBeVisible()
})