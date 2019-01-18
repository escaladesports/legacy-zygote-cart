/* eslint-disable */
"use strict";

module.exports = {
	splitName: true, // Split first name into 2 fields (first name, last name) {true}, or use one signle name field {false !default}
	plugins: [
		require('./plugins/zygote-plugin-standard-billing'), // Turn on the standard billing plugin to replace stripe's input
		// require('@escaladesports/zygote-plugin-esca-api/src'), // Working example plugin
	],
}