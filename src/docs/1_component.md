# Using the Component - React

```javascript
<Cart
	header={<img className={styles.logo} src={logo} />}
	cartHeader={<div className={styles.header}>With FREE shipping!</div>}
	cartFooter={<div className={styles.footer}>* Free shipping, except Alaska and Hawaii</div>}
	infoWebhook=''
	orderWebhook=''
	totalModifications={[
		{
			id: `shipping`,
			description: `Shipping`,
			displayValue: `-`,
		},
		{
			id: `tax`,
			description: `Tax`,
			displayValue: `-`,
		},
	]}
/>
```

Some areas can contain custom components like header and footer areas.

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

## Event Hooks

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

If you need to run client side code when something happens, Zygote comes with a set of event hooks you can use

## Google Analytics Integration

```jsx
<Cart googleAnalytics={false} />
```

By default, Zygote will send cart events to Analytics if Analytics are found on the site. It will also send ecommerce order information. To disable this, set the `googleAnalytics` property to `false`:

## Google Tag Manager Integration

```jsx
<Cart googleTagManager={false} />
```

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

## Optional Shipping

```jsx
import { addToCart } from 'zygote-cart';

<button onClick={addToCart({
  id: `DIS82`,
  name: `EBook`,
  image: `https://via.placeholder.com/75x75`,
  price: 1050,
  shippable: false,
})}>Add to Cart</button>
```

For items like digital goods or services that don't require shipping, you can pass a `shippable` property. If all the items in the cart have the `shippable` property, then shipping will not be required during checkout.

## Starting Total Modifications

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

The webhooks can pass modifications to the total, but if you need some modifications to show immediately once the cart is opened, you can use the `totalModifications` prop in the `<Cart />` component.

## Customize Default Error Messages

```jsx
<Cart
  infoSubmitError='There was an error with the server. Your order was not placed. Please try again later.'
  orderSubmitError='There was an error with the server. Your information was not placed. Please try again later.'
/>
```