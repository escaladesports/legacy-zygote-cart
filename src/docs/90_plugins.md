# Plugin API

```javascript
export { 
	preInfo, // Fires before fetching the 'infoWebhook'
	postInfo, // Fires after fetching the 'infoWebhook'
	calculateTax, // Fires on the 'Shipping' step 
	getShippingMethods, // Fires on the 'Shipping' step 
	preOrder, // Fires before fetching the 'orderWebhook'
	postOrder // Fires after fetching the 'orderWebhook'
}

export { 
	Info, // React component injected into the 'Details' step
	Shipping, // React component injected into the 'Shipping' step
	Payment // React component injected into the 'Payment' step
}
```

Does the cart not collect fields that you need? Are your endpoints expecting something different? Are your endpoints not delivered out of the box?

Neat.

Well, we could make you fill out an issue in the repository where we can officially ignore it. Or even send you to a chat client where we can also officaly ignore it.

OR!

You can take advantage of the fact that you are an adult and that you can not only eat gummybears for breakfast because nobody can tell you no, but that you can also write your own plugins for form fields, tax calculations, order manipulation, and more! We have exposed several programming hooks where you can inject whatever you need and do whatever you want.

## preInfo

```javascript
const preInfo = async ({ info }) => {
	return {
		skus: info.products ? info.products.map(function(product) { return product.id }) : []
	}
}
```
Fires **before** fetching the `infoWebhook`

## postInfo

```javascript
const postInfo = async ({ response, info, preFetchData }) => {
	const { inventory } = response
	const quantityModifications = Object.keys(inventory).map(id => {
		return {
			id: id,
			available: inventory[id].stock || 0,
		}
	})

	let shippingMethods = {}, selectedShippingMethod = {}
	await fetch(`https://products-test.escsportsapi.com/shipping`, { // Get packing dimensions
		method: `post`,
		body: JSON.stringify(preFetchData),
		headers: headers,
	})
		.then(response => response.json())
		.catch(error => console.log(`Request failed`, error))

	return {
		success: inventory && shippingMethods ? true : false,
		modifications: [
			{
				id: `january-sale`,
				description: `January Sale`,
				value: -2000,
			},
			shippingMethods[Object.keys(shippingMethods)[0]].tax,
		],
		shippingMethods: Object.keys(shippingMethods).map(ship => shippingMethods[ship]),
		selectedShippingMethod: Object.keys(selectedShippingMethod).length == 1 ? selectedShippingMethod[Object.keys(selectedShippingMethod)[0]] : selectedShippingMethod,
		quantityModifications: quantityModifications,
	}
}
```
Fires **after** fetching the `infoWebhook`

## calculateTax

```javascript
const calculateTax = async ({ shippingAddress, subtotal = 0, shipping = 0, discount = 0 }) => {
	if (!shippingAddress.shippingStateAbbr) return {}
	let checkTax = {
		state: shippingAddress.shippingStateAbbr,
		subtotal: (subtotal / 100).toFixed(2),
		shipping: (shipping / 100).toFixed(2),
		discount: ((discount < 0 ? discount * -1 : discount) / 100).toFixed(2),
	}

	return await fetch(`https://taxes-test.escsportsapi.com/calculate`, { // Get taxes
		method: `post`,
		body: JSON.stringify(checkTax),
		headers: headers,
	})
		.then(response => response.json())
		.then(jsonBody => {
			if (jsonBody.errors) {
				throw Error(jsonBody.errors)
			}
			return {
				id: `tax`,
				description: jsonBody.tax.label,
				value: parseInt(jsonBody.tax.value.toString().replace(/\./g, ''), 10),
			}
		})
		.catch(error => console.log('Failed to calculate taxes', error))
}
```

## getShippingMethods

```javascript
const getShippingMethods = async ({ response, info, preFetchData }) => {

}
```

## preOrder

```javascript
const preOrder = async ({ info }) => {

}
```

## postOrder

```javascript
const postOrder = async ({ response, info, preFetchData }) => {

}
```

## Info

```javascript
export class Info extends React.Component {
	render() {
		return (
			<Fragment>
				<Fragment>
					<NameInput
						name='billingFirstName'
						autoComplete='first name'
						step='billing'
						label='First Name'
					/>
					<NameInput
						name='billingLastName'
						autoComplete='last name'
						step='billing'
						label='Last Name'
					/>
				</Fragment>
				<CreditCard step='billing' />
				<div className='zygotePaymentExpCVC'>
					<div>
						<Expiration step='billing' />
					</div>
					<div>
						<Cvc step='billing' />
					</div>
				</div>
			</Fragment>
		)
	}
}
```

## Shipping

```javascript
export class Shipping extends React.Component {
	render() {
		return (
			<Fragment>
				<Fragment>
					<NameInput
						name='billingFirstName'
						autoComplete='first name'
						step='billing'
						label='First Name'
					/>
					<NameInput
						name='billingLastName'
						autoComplete='last name'
						step='billing'
						label='Last Name'
					/>
				</Fragment>
				<CreditCard step='billing' />
				<div className='zygotePaymentExpCVC'>
					<div>
						<Expiration step='billing' />
					</div>
					<div>
						<Cvc step='billing' />
					</div>
				</div>
			</Fragment>
		)
	}
}
```

## Payment

```javascript
export class Payment extends React.Component {
	render() {
		return (
			<Fragment>
				<Fragment>
					<NameInput
						name='billingFirstName'
						autoComplete='first name'
						step='billing'
						label='First Name'
					/>
					<NameInput
						name='billingLastName'
						autoComplete='last name'
						step='billing'
						label='Last Name'
					/>
				</Fragment>
				<CreditCard step='billing' />
				<div className='zygotePaymentExpCVC'>
					<div>
						<Expiration step='billing' />
					</div>
					<div>
						<Cvc step='billing' />
					</div>
				</div>
			</Fragment>
		)
	}
}
```