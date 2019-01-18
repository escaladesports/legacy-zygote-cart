# Introduction - Zygote Cart

```bash
npm install --save zygote-cart
```

```bash
yarn add zygote-cart
```

Welcome to the Zygote Cart API Documentation! Zygote is a drop-in ecommerce front end built in React. It takes a "bring your own backend" approach so it can work with any payment processor or order fulfillment system. Out of the box it works very well with Stripe.

**Notes:** At the moment Zygote only works with React. However there will be a universal option in the future.

## Usage

```jsx
import { Cart, addToCart } from 'zygote-cart';

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

> Editable style variables

```jsx
<Cart
  style={{
    fontColor: `#333`,
    borderColor: `#c0bfbf`,
    primaryColor: `#00cfff`,
    backgroundColor: `#fff`,
    overlayColor: `rgba(0,207,255,0.7)`,
    fontFamily: `Roboto`,
  }}
/>
```

> Removing styles

```jsx
<Cart style={false} />
```

There's two options for styling. You can either add in  colors and fonts as a property. Or you can turn off the auto styling and supply your own by targeting the classes in the cart.

