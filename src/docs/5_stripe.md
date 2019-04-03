# Stripe Integration

```javascript
<Cart
  stripeApiKey=''
/>
```

When a Stripe API Key is provided, the billing fields requesting the credit card information will be delivered by and sent to Stripe. **[Note]** if you have a `<Payment />` component plugin currently enabled, the credit card fields will be overwritten by that plugin regardless of supplying a Stripe key or not.

| Parameter Name | Description |
|:---------:|:--------:|
| `stripeApiKey` | The publishable key given to you while registering a new [Stripe application](https://stripe.com/docs/keys) |
| `stripeRestrictedKey` | This key is optional and should only have Read access to the Orders API. Omitting this key will prevent the loading of a user's recent order information. |