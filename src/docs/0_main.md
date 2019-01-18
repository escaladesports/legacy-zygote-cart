# Introduction - Zygote Cart

```bash
npm install --save zygote-cart
```

```bash
yarn add zygote-cart
```

Welcome to the Zygote Cart API Documentation! Zygote is a drop-in e-commerce front end built in React. It takes a "bring your own back-end" approach so it can work with any payment processor or order fulfillment system. Out of the box it works very well with Stripe.

**Note:** At the moment Zygote only works with React. However there will be a universal option in the future.

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

There are only two main functions of the application that you need to use in order to get the default behavior.

### Add to cart button

The button needs to be added to any and all products that you wish to sell on your site.

| Attribute | Function |
|:---------:|:--------:|
| `id` | Must be unique between all products. If you are using Stripe, this must match the product ID. |
| `name` | Human readable product name, displays in cart when item is added. |
| `image` | Image of product used when displaying added item in cart. |
| `description` | Quick description of the product used when displaying added item in cart. |
| `price` | The price of the item x10 in order to reduce rounding errors ($299.99 = 29999) |


### Cart component

There are only two required attributes for the `<Cart>` component. More on optional attributes later. The `<Cart>` component should only be placed once within your application and should be placed at the highest point possible in the chain such as a template or within a component that is rendered on every page like a header.

| Attribute | Function |
|:---------:|:--------:|
| `stripeApiKey` | [Publishable API key](https://stripe.com/docs/keys) given by Stripe (only required if using Stripe). |
| `orderWebhook` | The endpoint that will handle your ordering process (serverless function, Zapier workflow, etc.) |

## Styling

> Editable style variables

```jsx
<Cart
  style={{
    fontColor: `#333`,
    borderColor: `#c0bfbf`,
    primaryColor: `#B98AF8`,
    backgroundColor: `#fff`,
    overlayColor: `rgba(185,138,245,0.7)`,
    fontFamily: `Roboto`,
  }}
/>
```

> Removing styles

```jsx
<Cart style={false} />
```

There's two options for styling. You can either add in  colors and fonts as a property. Or you can turn off the auto styling and supply your own by targeting the classes in the cart.

Ultimately, the look and feel should be left up to the user.