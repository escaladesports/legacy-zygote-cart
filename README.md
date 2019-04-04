<p align="center">
    <img alt="Zygote Cart logo" src="https://escaladesports.github.io/zygote-cart/images/logo.png" width="200" />
</p>

<h1 align="center">
  Zygote3
</h1>

[![Build Status](https://travis-ci.org/escaladesports/zygote-cart.svg?branch=master)](https://travis-ci.org/escaladesports/zygote-cart)
[![npm](https://img.shields.io/npm/v/@escaladesports/zygote-cart.svg)](https://www.npmjs.com/package/@escaladesports/zygote-cart)

[Documentation](https://escaladesports.github.io/zygote-cart/index.html)

Zygote is a drop-in e-commerce front end built in React. It takes a "bring your own backend" approach so it can work with any payment processor or order fulfillment system. Out of the box it works very well with Stripe.

**Notes:** At the moment Zygote only works with React. However there will be a universal option in the future.

## Installation

With npm:

```bash
npm install --save @escaladesports/zygote-cart
```

Or with Yarn:

```bash
yarn add @escaladesports/zygote-cart
```

## Usage

```jsx
import { Cart, addToCart } from '@escaladesports/zygote-cart'

<button onClick={() => addToCart({
  id: `TESTID`,
  name: `Billiard Table`,
  image: `https://via.placeholder.com/75x75`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit...`,
  price: 29999,
})}>
  Add to Cart!
</button>

<Cart
	stripeApiKey='pk_test_12345'
	orderWebhook='/api/place-order'
/>
```

## Styling

There's two options for styling. You can either add in  colors and fonts as a property. Or you can turn off the auto styling and supply your own by targeting the classes in the cart.

Editable style variables:

```jsx
<Cart
  styles={{
    fontColor: `#333`,
    borderColor: `#c0bfbf`,
    altBorderColor: `#EFF0F0`,
    primaryColor: `#B98AF8`,
    backgroundColor: `#fff`,
    altBackgroundColor: `#F8F8F8`,
    overlayColor: `rgba(185,138,245,0.7)`,
    fontFamily: `Roboto`,
  }}
/>
```

Removing styles:

```jsx
<Cart style={false} />
```

## Custom Components

Some areas can contain custom components like header and footer areas.

Example:

```jsx
<Cart
  cartHeader={<img src='/your-logo.svg' />}
  infoFooter={<small>Free shipping, except Alaska and Hawaii</small>}
/>
```

Custom component properties:

- `header`: Appears at the top of all stages of the cart
- `footer`: Appears at the bottom of all stages of the cart
- `cartHeader`: Appears at the top of the initial cart stage
- `cartFooter`: Appears at the bottom of the initial cart stage
- `infoHeader`: Appears at the top of the info stage
- `infoFooter`: Appears at the bottom of the info stage
- `paymentHeader`: Appears at the top of the payment stage
- `paymentFooter`: Appears at the bottom of the payment stage
- `successHeader`: Appears at the top of the success stage
- `successFooter`: Appears at the bottom of the success stage

## Webooks

There are two URLs that can be passed as properties to send the cart information to your server:

- `infoWebhook`: Not required. Product and shipping information will be sent to this endpoing once the first section checkout has been completed. Useful for returning tax and shipping methods with this webhook.
- `orderWebhook`: Required. Product, payment, and shipping information will be sent to this webhook once the order has been completed.

### `infoWebhook`:

Example request:

```json
{
  "infoName": "John Doe",
  "infoEmail": "johndoe@gmail.com",
  "infoPhone": "555-555-1234",
  "shippingAddress1": "123 Some Street",
  "shippingAddress2": "Apt. 5F",
  "shippingCity": "Kansas City",
  "shippingState": "Missouri",
  "shippingZip": "64030",
  "products": [
    {
      "id": "TESTID",
      "name": "Billiard Table",
      "image": "https://via.placeholder.com/75x75",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      "price": 29999
    }
  ]
}
```

Example response:

```json
{
  "success": true,
  "modifications": [
    {
      "id": "january-sale",
      "description": "January Sale",
      "value": -2000
    },
    {
      "id": "tax",
      "description": "Sales Tax",
      "value": 899
    },
  ],
  "shippingMethods": [
    {
      "id": "ship-0",
      "description": "Standard Shipping",
      "value": 0
    },
    {
      "id": "ship-1",
      "description": "Express Shipping",
      "value": 1150
    },
    {
      "id": "ship-2",
      "description": "Overnight Shipping",
      "value": 4999
    }
  ],
  "selectedShippingMethod": "ship-0"
}
```

Example of the API returning an error and moving back to the "info" step:

```json
{
  "success": false,
  "error": "Your shipping address is incorrect.",
  "step": "info"
}
```

## Event Hooks

If you need to run client side code when something happens, Zygote comes with a set of event hooks you can use:

```jsx
<Cart
  onOpen={() => console.log(`Cart opened`)}
  onClose={() => console.log(`Cart closed`)}
  onAddProduct={product => console.log(`Added product`, product)}
  onRemoveProduct={product => console.log(`Removed product`, product)}
  onError={err => console.log(`Error caught`, err)}
  onInfoAttempt={info => console.log(`Info attempt`, info)}
  onInfo={info => console.log(`Info submit`, info)}
  onOrderAttempt={order => console.log(`Order attempt`, order)}
  onOrder={order => console.log(`Order submit`, order)}
/>
```

## Google Analytics Integration

By default, Zygote will send cart events to Analytics if Analytics are found on the site. It will also send ecommerce order information. To disable this, set the `googleAnalytics` property to `false`:

```jsx
<Cart googleAnalytics={false} />
```

## Google Tag Manager Integration

By default, Zygote will send cart data and events to Google Tag Manager if GTM is found on the site. The event IDs that will be sent:

- zygoteOpen
- zygoteClose
- zygoteAdd
- zygoteRemove
- zygoteError
- zygoteAttemptInfo
- zygoteInfo
- zygoteAttemptOrder
- zygoteOrder

To disable this, set the `googleTagManager` property to `false`:

```jsx
<Cart googleTagManager={false} />
```

## Optional Shipping

For items like digital goods or services that don't require shipping, you can pass a `noShip` property. If all the items in the cart have the `noShip` property, then shipping will not be required during checkout.

Example:

```jsx
import { addToCart } from '@escaladesports/zygote-cart'

<button onClick={addToCart({
  id: `DIS82`,
  name: `EBook`,
  image: `https://via.placeholder.com/75x75`,
  price: 1050,
  noShip: true,
})}>Add to Cart</button>
```

## Starting Total Modifications

The webhooks can pass modifications to the total, but if you need some modifications to show immediately once the cart is opened, you can use the `totalModifications` prop in the `<Cart />` component.

```jsx
<Cart
  totalModifications={[
    {
      id: `shipping`,
      description: `Shipping`,
      value: 0,
      displayValue: `Free`,
    },
    {
      id: `tax`,
      description: `Tax`,
      value: 0,
      displayValue: `Calculated at checkout`,
    },
  ]}
/>
```

## Customize Default Error Messages

```jsx
<Cart
  infoSubmitError='There was an error with the server. Your order was not placed. Please try again later.'
  orderSubmitError='There was an error with the server. Your information was not placed. Please try again later.'
/>
```


