# Configurations

> zygote.config.js

```javascript
"use strict";

module.exports = {
  // Split first name into 2 fields (first name, last name) {true},
  // or use one single name field {false !default}
  splitName: true, 
  plugins: [
    // Turn on the standard billing plugin to replace stripe's input
    require('./plugins/zygote-plugin-standard-billing'), 

    // Working example plugin
    require('@escaladesports/zygote-plugin-esca-api/src'), 
  ],
}
```