# Configurations

## Settings

```javascript
  <Cart
    shipping: true
    tax: true
    coupons: true
    splitName: false
    showStates={`["state-list", "dc-list"]`}
  />
```
Here are a few configurations you can turn on and off on a cart per cart basis.

| Parameter Name | Description |
|:---------:|:--------:|
| `shipping` | Turn on `true` or off `false` the shipping step during checkout |
| `tax` | Turn on `true` or off `false` all tax calculations |
| `coupons` | Turn on `true` or off `false` the coupon input field |
| `splitName` | Turn on `true` or off `false` the option which controls whether the name field on the info page is one single `name` input (false), or two separate fields `firstName` and `lastName` (true) |
| `showStates` | States which appear in the shipping dropdown <br/>Use array options from [@escaladesports/us-states-lib](https://www.npmjs.com/package/@escaladesports/us-states-lib)<br />Defaults to lower 48 US States|

## Plugins

```javascript
import * as EscaAPI from '@escaladesports/zygote-plugin-esca-api'

  <Cart
    plugins: {[ EscaAPI ]}
  />
```

| Parameter Name | Description |
|:---------:|:--------:|
| `plugins` | An array of required packages that are scanned for expected hooks and then are executed at the hook's firing point |