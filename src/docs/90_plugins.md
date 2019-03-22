# Plugin API



Does the cart not collect fields that you need? Are your endpoints expecting something different? Are your endpoints not delivered out of the box?

Neat.

Well, we could make you fill out an issue in the repository where we can officially ignore it. Or even send you to a chat client where we can also officaly ignore it.

OR!

You can take advantage of the fact that you are an adult and that you can not only eat gummybears for breakfast because nobody can tell you no, but that you can also write your own plugins for form fields, tax calculations, order manipulation, and more! We have exposed several programming hooks where you can inject whatever you need and do whatever you want.

| Hook Name | Description |
|:---------:|:--------:|
| `preInfo` | Fires before fetching the `infoWebhook` between the 'Details' and 'Shipping' steps |
| `postInfo` | Fires after fetching the `infoWebhook` between the 'Details' and 'Shipping' steps |
| `coupons` | Fires after fetching the `infoWebhook` between the 'Details' and 'Shipping' steps |
| `calculateTax` | Fires on the 'Shipping' step |
| `getShippingMethods` | Fires on the 'Shipping' step |
| `preOrder` | Fires before fetching the `orderWebhook` between the 'Payment' and 'Success' steps |
| `postOrder` | Fires after fetching the `orderWebhook` between the 'Payment' and 'Success' steps |

| Component Name | Description |
|:---------:|:--------:|
| `Info` | React component injected into the 'Details' step |
| `Shipping` | React component injected into the 'Shipping' step |
| `Payment` | React component injected into the 'Payment' step (usually form fields) |
| `ExternalPayment` | React component injected into the 'Payment' step used for external payment gateways such as PayPal and Apple Pay (usually a button) |

## preInfo

```javascript
const preInfo = async ({ preFetchData, info }) => {
  return {
    skus: info.products ? info.products.map(function(product) { return product.id }) : []
  }
}
```
Fires **before** fetching the `infoWebhook` between the 'Details' and 'Shipping' steps. This hook should be used if your `infoWebhook` endpoint requires a different format then what zygote produces**.** In this example, the plugin is replacing the entire request with single array of SKUs.

## postInfo

```javascript
const postInfo = async ({ response, info, preFetchData }) => {

  let quantityModifications = []
  await fetch(`https://api.com/stock`, { // Check stock for each item in order
    method: `post`,
    body: JSON.stringify(response.products),
  })
    .then(res => res.json())
    .then(data => {
      response.products.map(prod => {
        quantityModifications.push({ // Loops over products and builds array of product ids with their available stock
          id: prod.id,
          available: res[prod.id].stock),
        }
      })
    })
    .catch(error => console.log(`Request failed`, error))

  return {
    ...response,
    quantityModifications: quantityModifications, // This will be used to compare the number requested vs the number available and will adjust the cart
  }
}
```
Fires **after** fetching the `infoWebhook` between the 'Details' and 'Shipping' steps.

## coupons

```javascript
const coupons = async ({ response, info, preFetchData }) => {
	if (info.coupon) {
		const check = {
			code: info.coupon,
			order: {
				products: response.products,
			}
		}

		await fetch(`https://api.com/coupons`, { // Get packing dimensions
			method: `post`,
			body: JSON.stringify(check),
    })
      .then(res => res.json())
      .then(coupon => {
        if (coupon) {
          if (!coupon.valid) { // Not a valid coupon
            response.messages.info.push(
              coupon.reason && coupon.reason.length > 0 ? `${coupon.error}. ${coupon.reason[0]}` : coupon.error
            )
            info.coupon = ''
          }
          else {
            response.modifications.push({ // Add valid coupon to modifications array
              id: coupon.code,
              description: coupon.label,
              value: coupon.discount,
              type: coupon.type
            })
          }
        }
      })
      .catch(error => console.log(`Request failed`, error))
	}
	
	return response
}
```

Fires **after** fetching the `infoWebhook` between the 'Details' and 'Shipping' steps

## calculateTax

```javascript
const calculateTax = async ({ shippingAddress, subtotal = 0, shipping = 0, discount = 0 }) => {
  let checkTax = {
    state: shippingAddress.shippingStateAbbr,
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
  }

  return await fetch(`https://api.com/taxes`, { // Get taxes
    method: `post`,
    body: JSON.stringify(checkTax),
  })
    .then(response => response.json())
    .then(jsonBody => {
      if (jsonBody.errors) {
        throw Error(jsonBody.errors)
      }
      return {
        id: `tax`,
        description: jsonBody.tax.label,
        value: parseInt(jsonBody.tax.value),
      }
    })
    .catch(error => console.log('Failed to calculate taxes', error))
}
```

Fires on the 'Shipping' step.

## getShippingMethods

```javascript
const getShippingMethods = async ({ response, info, preFetchData }) => {
  const shipping = {
    destination: {
      street1: info.shippingAddress1,
      street2: info.shippingAddress2,
      city: info.shippingCity,
      state: info.shippingStateAbbr,
      zip: info.shippingZip,
      country: `US`,
      company: info.shippingCompany || ``,
      phone: info.infoPhone || ``,
    },
    products: response.products
  }

  let shippingMethods = []
  await fetch(`https://api.com/shipping`, { // Get taxes
    method: `post`,
    body: JSON.stringify(shipping),
  })
    .then(response => response.json())
		.then(data => {
			if (data.errors) {
				throw Error(data.errors)
      }

      shippingMethods = data.shippingOptions.map(option => (
        {
          id: option.id,
          description: option.label,
          value: option.value,
          addInfo: `Get it ${option.eta}!`,
        }
      ))
    })

  return {
    ...response,
		shippingMethods: shippingMethods,
		selectedShippingMethod: shippingMethods[0], // Default selected one
  }
}
```

Fires on the 'Shipping' step.

## preOrder

```javascript
const preOrder = async ({ preFetchData, info }) => {
  await fetch(`https://api.com/getTracking`, { // Call some service to do work before the order is placed
    method: `post`,
    body: JSON.stringify(preFetchData),
  })

  return preFetchData
}
```

Fires **before** fetching the `orderWebhook` between the 'Payment' and 'Success' steps.

## postOrder

```javascript
const postOrder = async ({ response, info, preFetchData }) => {
  await fetch(`https://api.com/trackOrder`, { // Save order info to another service after the order is placed
    method: `post`,
    body: JSON.stringify(response),
  })

  return response
}
```

Fires **after** fetching the `orderWebhook` between the 'Payment' and 'Success' steps

## \<Info />

```javascript
export class Info extends React.Component {
  render() {
    return (
      <div>
        <GiftMessageInput />
        Message signature: <input type="text" name="signature" />
      </div>
    )
  }
}
```

React component injected into the 'Details' step.

## \<Shipping />

```javascript
export class Shipping extends React.Component {
  render() {
    return (
      <Fragment>
        Instructions for driver:
        <textarea name="forDriver"></textarea>
        <img src="/market-tracking-pixel-52.png" />
      </Fragment>
    )
  }
}
```

React component injected into the 'Shipping' step.

## \<Payment />

```javascript
export class Payment extends React.Component {
  render() {
    return (
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

React component injected into the 'Payment' step (usually form fields).

## \<ExternalPayment />

```javascript
export class ExternalPayment extends React.Component {
  render() {
    return (
      <PaypalExpressBtn
        client={{
          sandbox: paypalAppId,
          production: paypalAppId,
        }}
        env={paypalEnv}
        shipping={1}
        onError={err => console.error(err)}
        onSuccess={token => {
          submitOrder({
            token,
            type: `paypal`,
          })
        }}
        transaction={transaction}
      />
    )
  }
}
```

React component injected into the 'Payment' step used for external payment gateways such as PayPal and Apple Pay (usually a button)