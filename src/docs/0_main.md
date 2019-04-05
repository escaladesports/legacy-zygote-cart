# Introduction - Zygote Cart

```bash
npm install --save @escaladesports/zygote-cart
```

```bash
yarn add @escaladesports/zygote-cart
```



Welcome to the Zygote Cart API Documentation! Zygote is a drop-in e-commerce front end built in React. It takes a "bring your own back-end" approach so it can work with any payment processor or order fulfillment system. Out of the box it works very well with Stripe.

**Note:** At the moment Zygote only works with React. However there will be a universal option in the future.

[![GitHub forks](https://img.shields.io/github/forks/escaladesports/zygote-cart.svg?style=social)](https://github.com/escaladesports/zygote-cart)
[![Build Status](https://travis-ci.org/escaladesports/zygote-cart.svg?branch=master)](https://travis-ci.org/escaladesports/zygote-cart)
![npm](https://img.shields.io/npm/v/@escaladesports/zygote-cart.svg)

## Usage

```jsx
import { Cart, openCart, addToCart } from '@escaladesports/zygote-cart';



<button onClick={() => addToCart({
  id: `TESTID`,
  name: `Billiard Table`,
  image: `https://via.placeholder.com/75x75`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit...`,
  price: 29999,
  shippable: true,
  quantity: 1,
})}>
  Add to Cart!
</button>








<button onClick={openCart}>Open Cart</button>
<Cart
  stripeApiKey='pk_test_12345'
  orderWebhook='/api/place-order'
/>
```

There are only two main functions of the application that you need to use in order to get the default behavior.

### Add to cart button

The button needs to be added to any and all products that you wish to sell on your site.

| Parameter Name | Description |
|:---------:|:--------:|
| `id` | Must be unique between all products. If you are using Stripe, this must match the product ID. |
| `name` | Human readable product name, displays in cart when item is added. |
| `image` | Image of product used when displaying added item in cart. |
| `description` | Quick description of the product used when displaying added item in cart. |
| `price` | The price of the item in cents in order to reduce rounding errors ($299.99 = 29999). |
| `shippable` | Whether the item for purchase is a physical good that will be shipped to the customer (true) or a digital good and the shipping step can be skipped (false). |
| `quantity` | Pre-add this number of products to the cart when the user clicks. Defaults to 1 if not specified or included. |


### Cart component

There are only two required attributes for the `<Cart>` component. More on optional attributes later. The `<Cart>` component should only be placed once within your application and should be placed at the highest point possible in the chain such as a template or within a component that is rendered on every page like a header.

| Parameter Name | Description |
|:---------:|:--------:|
| `stripeApiKey` | [Publishable API key](https://stripe.com/docs/keys) given by Stripe (only required if using Stripe). |
| `orderWebhook` | The endpoint that will handle your ordering process (serverless function, Zapier workflow, etc.) |

## Styling

> Editable style variables

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

> Removing styles

```jsx
<Cart style={false} />
```

There's two options for styling. You can either add in  colors and fonts as a property. Or you can turn off the auto styling and supply your own by targeting the classes in the cart.

Ultimately, the look and feel should be left up to the user.