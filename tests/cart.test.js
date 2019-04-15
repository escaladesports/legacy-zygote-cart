import React, { Fragment } from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { Cart, addToCart } from '../dist'

const addItemToCart = () => {
	const utils = render(
		<Fragment>
			<Cart 
				testing={true}
				infoWebhook='https://181-esca-api--zygote.netlify.com/.netlify/functions/info'
				orderWebhook='https://181-esca-api--zygote.netlify.com/.netlify/functions/order'
			/>
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
	fireEvent.click(getByText(/Secure Checkout/i))
	expect(getByTestId(`info-step`)).toBeVisible()
	expect(getByTestId(`shipping-step`)).not.toBeVisible()
})

test(`Partially fill in Details, expect error`, () => {
	const { getByLabelText, getByTestId, container } = addItemToCart()

	fireEvent.change(getByLabelText(/Full Name/i, { selector: `input` }), { target: { value: `John Doe` } })
	expect(getByLabelText(/Full Name/i, { selector: `input` }).value).toBe(`John Doe`)

	fireEvent.click(getByTestId(`info-next-step`))
	expect(getByTestId(`info-step`)).toBeVisible()
	expect(container).toHaveTextContent(/This field is required/i)
	expect(getByTestId(`shipping-step`)).not.toBeVisible()
})

test(`Fill in Details, move steps, complete order`, async () => {
	const { getByLabelText, getByTestId/*, container, debug*/ } = addItemToCart()

	let inputNode = getByLabelText(/Full Name/i, { selector: `input` })
	fireEvent.change(inputNode, { target: { value: `John Doe` } })
	expect(inputNode.value).toBe(`John Doe`)

	inputNode = getByLabelText(/Email/i, { selector: `input` })
	fireEvent.change(inputNode, { target: { value: `test@example.com` } })
	expect(inputNode.value).toBe(`test@example.com`)

	inputNode = getByLabelText(/Phone/i, { selector: `input` })
	fireEvent.change(inputNode, { target: { value: `(123) 456-7890` } })
	expect(inputNode.value).toBe(`(123) 456-7890`)

	inputNode = getByLabelText(/Address/i, { selector: `input` })
	fireEvent.change(inputNode, { target: { value: `123 Fake St.` } })
	expect(inputNode.value).toBe(`123 Fake St.`)

	inputNode = getByLabelText(/City/i, { selector: `input` })
	fireEvent.change(inputNode, { target: { value: `Test` } })
	expect(inputNode.value).toBe(`Test`)

	inputNode = getByLabelText(/State/i, { selector: `select` })
	fireEvent.change(inputNode, { target: { value: `Alabama` } })
	expect(inputNode.value).toBe(`Alabama`)

	inputNode = getByLabelText(/Zip Code/i, { selector: `input` })
	fireEvent.change(getByLabelText(/Zip Code/i), { target: { value: `12345` } })
	expect(inputNode.value).toBe(`12345`)
	
	fireEvent.click(getByTestId(`info-next-step`))
	await wait(() => {
		expect(getByTestId(`cart`)).toHaveClass(`zygoteOnPaymentStep`)
	})

	expect(getByTestId(`payment-step`)).toBeVisible()
	expect(getByTestId(`info-step`)).not.toBeVisible()

	// fireEvent.click(getByTestId(`submit-order-button`))
	// debug()
	// await wait(() => {
	// 	expect(getByTestId(`cart`)).toHaveClass(`zygoteOnSuccessStep`)
	// })

	// expect(getByTestId(`success-step`)).toBeVisible()
	// expect(getByTestId(`payment-step`)).not.toBeVisible()
	// expect(container).toHaveTextContent(/Order Received!/)
})

