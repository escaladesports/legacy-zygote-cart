# Using the Component - React

```javascript
<Cart
  header={<img className={styles.logo} src={logo} />}
  cartHeader={<div className={styles.header}>With FREE shipping!</div>}
  cartFooter={<div className={styles.footer}>* Free shipping, except Alaska and Hawaii</div>}
/>
```

Some parts of the cart can contain custom components like the header and footer.

Custom component properties:

| Parameter Name | Description |
|:---------:|:--------:|
| `header` | Appears at the **top of all stages** of the cart |
| `footer` | Appears at the **bottom of all stages** of the cart |
| `cartHeader` | Appears at the **top of the initial cart** stage |
| `cartFooter` | Appears at the **bottom of the initial cart** stage |
| `infoHeader` | Appears at the **top of the info** stage |
| `infoFooter` | Appears at the **bottom of the info** stage |
| `paymentHeader` | Appears at the **top of the payment** stage |
| `paymentFooter` | Appears at the **bottom of the payment** stage |
| `successHeader` | Appears at the **top of the success** stage |
| `successFooter` | Appears at the **bottom of the success** stage |

## Event Hooks

```javascript
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

- `onOpen`
- `onClose`
- `onAddProduct`
- `onRemoveProduct`
- `onError`
- `onInfoAttempt`
- `onInfo`
- `onOrderAttempt`
- `onOrder`

## Google Analytics Integration

```javascript
<Cart googleAnalytics={false} />
```

By default, Zygote will send cart events to Google Analytics if Google Analytics is found on the site. It will also send e-commerce order information. To disable this feature, set the `googleAnalytics` property to `false`.

Note that this is for use with [analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/). For Google Analytics tracking via Google Tag Manager ([gtm.js](https://developers.google.com/tag-manager/quickstart)), see below.

## Google Tag Manager Integration

```javascript
<Cart googleTagManager={false} />
```

By default, Zygote will send cart data and events to Google Tag Manager if GTM is found on the site. The event IDs that will be sent:

- `zygoteOpen`
- `zygoteClose`
- `zygoteAdd`
- `zygoteRemove`
- `zygoteError`
- `zygoteAttemptInfo`
- `zygoteInfo`
- `zygoteAttemptOrder`
- `zygoteOrder`
	- Sends all order fields
- `zygoteOrderGA`
	- Sends fields for [Google Analytics e-commerce transactions](https://support.google.com/tagmanager/answer/6107169?hl=en)

To disable this, set the `googleTagManager` property to `false`.

## Optional Shipping

```javascript
import { addToCart } from '@escaladesports/zygote-cart';

<button onClick={addToCart({
  id: `DIS82`,
  name: `EBook`,
  image: `https://via.placeholder.com/75x75`,
  price: 1050,
  shippable: false,
})}>Add to Cart</button>
```

For items like digital goods or services that don't require shipping, you can pass a `shippable` property. If all the items in the cart have the `shippable` property set to false, then shipping will not be required during checkout. If at least one item in the cart requires shipping, the digital goods will be included in the checkout as expected, but there will also be a shipping step for those items still requiring it.

So you can have both in the same cart.

## Starting Total Modifications

```javascript
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
      value: 325,
      displayValue: `Calculated at checkout`,
    },
    {
      id: `sale-1`,
      description: `Super Sale!`,
      value: -2000,
    },
  ]}
/>
```

The webhooks can pass modifications to the total, but if you need some modifications to show immediately once the cart is opened, you can use the `totalModifications` prop in the `<Cart />` component.

| Parameter Name | Description |
|:--------------:|:--------:|
| `id`           | A unique ID for each modification. `tax` is reserved for any sales tax being applied and all shipping modifications must start with the word `shipping` |
| `description`  | Displayed in the subtotals list |
| `value`        | The amount the modification is changing the total by. This value should be te amount, in dollars, x10 to prevent rounding issues ($10.00 = 1000). Negative numbers are also valid if you are applying a discount |
| `displayValue` | If you wish to display something other than `value` in the subtotal list (ie. Free, Calculated at checkout) |


## Customize Default Error Messages

```javascript
<Cart
  infoSubmitError='There was an error with the server. Your order was not placed. Please try again later.'
  orderSubmitError='There was an error with the server. Your information was not placed. Please try again later.'
/>
```

There are two error events that we've exposed to allow you to enter your own custom messages.

| Parameter Name | Description |
|:---------:|:--------:|
| `infoSubmitError` | When an error occurs between the `Details` stage and the `Shipping` stage |
| `orderSubmitError` | When an error occurs while trying to submit the order to your webhook, or when trying to pay |


## Cart Quantity - Higher Order Component (HOC)

HOC that displays total quantity of items added to Cart.

```javascript
import { CartQuantity } from '@escaladesports/zygote-cart';

<CartQuantity>
  {qty => (
    <React.Fragment>
      {qty}
    </React.Fragment>
  )}
</CartQuantity>
```