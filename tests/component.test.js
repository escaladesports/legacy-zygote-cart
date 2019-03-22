import React, { Fragment } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { Cart, openCart, addToCart } from '../dist'

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

test(`Cart can open`, () => {
	const {getByText, container} = render(
		<Fragment>
			<Cart />
			<button onClick={openCart}>Open Cart</button>
		</Fragment>
	)
	fireEvent.click(getByText(/Open Cart/i))
	expect(container).toHaveTextContent(/Zygote Cart/)
})

test(`Items can be added`, () => {
	const { container } = addItemToCart()
	expect(container).toHaveTextContent(/Microfiber Bean Bags with Tub/)
})

test(`Items can be increased`, () => {
	const { getByText, container } = addItemToCart()
	fireEvent.click(getByText(/\+/i))
	expect(container).toHaveTextContent(/Subtotal\$69\.98/)
})

test(`Items can be decreased`, () => {
	const { getByText, container } = addItemToCart()
	fireEvent.click(getByText(/-/i))
	expect(container).toHaveTextContent(/Subtotal\$34\.99/)
})

test(`Items can be removed`, () => {
	const { getByTestId, container } = addItemToCart()
	fireEvent.click(getByTestId(`removeItem`))
	expect(container).toHaveTextContent(/Your cart is empty/)
})

