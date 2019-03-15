# Configurations

## Settings

```javascript
  <Cart
    shipping: true
    tax: true
    coupons: true
    splitName: false
  />
```
Here are a few configurations you can turn on and off on a cart per cart basis.

| Parameter Name | Description |
|:---------:|:--------:|
| `shipping` | Turn on `true` or off `false` the shipping step during checkout |
| `tax` | Turn on `true` or off `false` all tax calculations |
| `coupons` | Turn on `true` or off `false` the coupon input field |
| `splitName` | Turn on `true` or off `false` the option which controls whether the name field on the info page is one single `name` input (false), or two separate fields `firstName` and `lastName` (true) |


## Plugins

> zygote.config.js

```javascript
"use strict";

module.exports = {
  plugins: [
    require('./plugins/zygote-plugin-standard-billing'), 
    require('@escaladesports/zygote-plugin-esca-api/src'), 
  ],
}
```

The `zygote.config.js` file, in the root of your project, allows you to inject plugins and alter a limited number of features about the application**.**

| Parameter Name | Description |
|:---------:|:--------:|
| `splitName` | This option controls whether the name field on the info page is one single `name` input (false), or two separate fields `firstName` and `lastName` (true) |
| `plugins` | An array of required packages that are scanned for expected hooks and then are executed at the hook's firing point |