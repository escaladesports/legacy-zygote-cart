# Webhooks

There are two URLs that can be passed as properties to send the cart information to your server:

- `infoWebhook`: Not required. Product and shipping information will be sent to this endpoing once the first section checkout has been completed. Useful for returning tax and shipping methods with this webhook.
- `orderWebhook`: Required. Product, payment, and shipping information will be sent to this webhook once the order has been completed.

## infoWebhook

> Example Request

```json
{
  "infoName": "John Doe",
  "infoEmail": "johndoe@gmail.com",
  "infoPhone": "555-555-1234",
  "shippingAddress1": "123 Some Street",
  "shippingAddress2": "Apt. 5F",
  "shippingCompany": "",
  "shippingCity": "Kansas City",
  "shippingState": "Missouri",
  "shippingStateAbbr": "MO",
  "shippingZip": "64030",
  "coupon": "",
  "event": "info",
  "products": [{
    "id": "TESTA",
    "name": "Microfiber Bean Bags with Tub",
    "image": "https://via.placeholder.com/75x75",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "price": 3499,
    "shippable": true,
    "quantity": 1
  }, {
    "id": "TESTB",
    "name": "Safetyglass Arrows – 28\"",
    "image": "https://via.placeholder.com/75x75",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "price": 32400,
    "shippable": true,
    "quantity": 1
  }],
  "selectedShippingMethod": false,
  "totals": {
    "subtotal": 35899,
    "modifications": [{
      "id": "shipping",
      "description": "Shipping",
      "displayValue": "-"
    }, {
      "id": "tax",
      "description": "Tax",
      "displayValue": "-"
    }],
    "total": 35899,
    "loading": true
  },
  "meta": {}
}
```

> Example Response

```json
{
  "success": true,
  "modifications": [{
    "id": "january-sale",
    "description": "January Sale",
    "value": -2000
  }, {
    "id": "tax",
    "description": "Sales Tax",
    "value": 899
  }],
  "shippingMethods": [{
    "id": "shipping-0",
    "description": "Standard Shipping",
    "value": 0
  }, {
    "id": "shipping-1",
    "description": "Express Shipping",
    "value": 1150
  }, {
    "id": "shipping-2",
    "description": "Overnight Shipping",
    "value": 4999
  }],
  "selectedShippingMethod": "shipping-0",
  "quantityModifications": [{
    "id": "TESTA",
    "available": "5"
  }, {
    "id": "TESTB",
    "available": "2"
	}],
	"messages": {
		"info": "Custom message here"
	}
}
```

> Example Error

```json
{
  "success": false,
  "messages": {
		"error": "Your shipping address is incorrect."
		},
  "step": "info"
}
```

### Example Request

| Parameter Name | Description |
|:---------:|:--------:|
| `infoName` | If **splitName** is set within the configuration, this will be replaced by `infoFirstName` and `infoLastName` |
| `infoEmail` | Order's email |
| `infoPhone` | Order's phone number  |
| `shippingAddress1` | Order's shipping address |
| `shippingAddress2` | Order's shipping apartment, office, etc |
| `shippingCompany` | Order's company (if applicable) |
| `shippingCity` | Order's shipping city |
| `shippingState` | Order's shipping state |
| `shippingStateAbbr` | Order's shipping state abbreviation |
| `shippingZip` | Order's shipping zip |
| `coupon` | Any entered coupons, should be used to validate |
| `event` | Which step the user is currently on |
| `products` | Array of products being purchased including their `id`, `price`, `quantity`, and if the item is `shippable` {true} or a digital good {false} |
| `selectedShippingMethod` | If the order has a pre-selected shipping method |
| `totals` | The order totals including any pre order modifications such as promotions or taxes |

### Example Response

| Parameter Name | Description |
|:---------:|:--------:|
| `success` | Whether or not the action was successful |
| `modifications` | Array of modification objects containing a unique `id`, human readable `description`, and calculated `value` |
| `shippingMethods` | An array of shipping methods objects containing a unique `id`, human readable `description`, and calculated `value` |
| `selectedShippingMethod` | The default selected shipping method's `id`. Leave blank to not preselect an option |
| `quantityModifications` | An array of available inventory for each item in the order. This will be used to alter the order on behalf of the user if their order exceeds the available amount of product. The object should include the item's `id` and the number `available`. This is not required. If more product is ordered than available, the order will proceed normally |

### Example Error

| Parameter Name | Description |
|:---------:|:--------:|
| `success` | Whether or not the action was successful |
| `error` | The error message to display to the user |
| `step` | The step to return to upon failure (`cart`, `info`, `shipping`, `payment`, `success`) |

### Multiple shipping options

In the case that an order needs to be shipped from multiple locations (ie. `TESTA` is shipping from Florida, where `TESTB` is shipping from Indiana) the `shippingMethods` key will be altered slightly to accommodate this:

`{
  shippingMethods: [
    {
      id: 'shipping1',
      description: 'Pickleball paddle, Basketball',
      shippingMethods: [
        {
          id: 'shipping1-method1',
          value: 0,
          description: 'Standard shipping'
        },
        {
          id: 'shipping1-method2',
          value: 1500,
          description: 'Express shipping'
        }
      ]
    },
    {
      id: 'shipping2',
      description: 'Crossbow',
      shippingMethods: [
        {
          id: 'shipping2-method1',
          value: 1000,
          description: 'Standard shipping'
        },
        {
          id: 'shipping2-method2',
          value: 5000,
          description: 'Express shipping'
        }
      ]
    }
  ],
  selectedShippingMethod: {
    shipping1: 'shipping1-method1',
    shipping2: 'shipping2-method2',
  }
}`

This will alert the user that the order will arrive in multiple shipments, list the items in each via the description field, and then allow them to select their desired shipping method on each.

## orderWebhook

> Example Request

```json
{
  "infoName": "John Doe",
  "infoEmail": "johndoe@gmail.com",
  "infoPhone": "555-555-1234",
  "shippingAddress1": "123 Some Street",
  "shippingAddress2": "Apt. 5F",
  "shippingCompany": "",
  "shippingCity": "Kansas City",
  "shippingState": "Missouri",
  "shippingZip": "64030",
  "coupon": "",
  "billingName": "John Doe",
  "billingCardNumber": "4111111111111111",
  "billingCardExpiration": "10 / 28",
  "billingCardCVC": "900",
  "sameBilling": true,
  "billingStateAbbr": "MO",
  "paymentType": "standard",
  "products": [{
    "id": "TESTA",
    "name": "Microfiber Bean Bags with Tub",
    "image": "https://via.placeholder.com/75x75",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "price": 3499,
    "shippable": true,
    "quantity": 1
  }, {
    "id": "TESTB",
    "name": "Safetyglass Arrows – 28\"",
    "image": "https://via.placeholder.com/75x75",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "price": 32400,
    "shippable": true,
    "quantity": 1
  }],
  "totals": {
    "subtotal": 35899,
    "modifications": [{
      "id": "january-sale",
      "description": "January Sale",
      "value": -2000
    }, {
      "id": "tax",
      "description": "Sales Tax",
      "value": 899
    }, {
      "id": "shipping",
      "description": "Express Shipping",
      "value": 1150
    }],
    "total": 35948,
    "loading": false
  },
  "event": "order",
  "selectedShippingMethod": "shipping-1",
  "meta": {}
}
```

> Example Response

```json
{
  "success": true,
}
```

> Example Error

```json
{
  "success": false,
  "error": "Payment was rejected.",
  "step": "order"
}
```

### Example Request

| Parameter Name | Description |
|:---------:|:--------:|
| `infoName` | If **splitName** is set within the configuration, this will be replaced by `infoFirstName` and `infoLastName` |
| `infoEmail` | Order's email |
| `infoPhone` | Order's phone number  |
| `shippingAddress1` | Order's shipping address |
| `shippingAddress2` | Order's shipping apartment, office, etc |
| `shippingCompany` | Order's company (if applicable) |
| `shippingCity` | Order's shipping city |
| `shippingState` | Order's shipping state |
| `shippingZip` | Order's shipping zip |
| `coupon` | Any entered coupons, should be used to validate |
| `event` | Which step the user is currently on |
| `products` | Array of products being purchased including their `id`, `price`, `quantity`, and if the item is `shippable` {true} or a digital good {false} |
| `selectedShippingMethod` | If the order has a pre-selected shipping method |
| `totals` | The order totals including any pre order modifications such as promotions or taxes |