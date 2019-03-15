# Coupons

```js
return {
  modifications: [
    {
      id: '50OFF' // Coupon code
      description: 'Spring savings event', // Used in subtotal as a label
      value: '-5000', // Negative, cent representation of discount
      type: 'discount' // Metadata you can later use in your plugins
    }
  ]
}
```

Coupons are represented by a single text field that should either be validated through a plugin or via your payment gateway. If validating with a plugin, be sure to return a valid modification object for Zygote to keep track of. Coupons are validated **after** fetching the `infoWebhook`.