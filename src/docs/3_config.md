# Configurations

> zygote.config.js

```javascript
"use strict";

module.exports = {
  splitName: true, 
  plugins: [
    require('./plugins/zygote-plugin-standard-billing'), 
    require('@escaladesports/zygote-plugin-esca-api/src'), 
  ],
}
```

The `zygote.config.js` file, in the root of your project, allows you to inject plugins and alter a limited number of features about the application.

| Parameter Name | Description |
|:---------:|:--------:|
| `splitName` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | This option controls whether the name field on the info page is one single `name` input (false), or two separate fields `firstName` and `lastName` (true) |
| `plugins` | An array of required packages that are scanned for expected hooks and then are executed at the hook's firing point |