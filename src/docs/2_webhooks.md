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
  "shippingCity": "Kansas City",
  "shippingState": "Missouri",
  "shippingZip": "64030",
  "products": [
    {
      "id": "TESTID",
      "name": "Billiard Table",
      "image": "https://via.placeholder.com/75x75",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      "price": 29999
    }
  ]
}
```

> Example Response

```json
{
  "success": true,
  "modifications": [
    {
      "id": "january-sale",
      "description": "January Sale",
      "value": -2000
    },
    {
      "id": "tax",
      "description": "Sales Tax",
      "value": 899
    },
  ],
  "shippingMethods": [
    {
      "id": "ship-0",
      "description": "Standard Shipping",
      "value": 0
    },
    {
      "id": "ship-1",
      "description": "Express Shipping",
      "value": 1150
    },
    {
      "id": "ship-2",
      "description": "Overnight Shipping",
      "value": 4999
    }
  ],
  "selectedShippingMethod": "ship-0"
}
```

> Example Error

```json
{
  "success": false,
  "error": "Your shipping address is incorrect.",
  "step": "info"
}
```

## orderWebhook