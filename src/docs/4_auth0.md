# Auth0 Integration

```javascript
<Cart
  auth0ClientID='public_id'
  auth0Logout='https://www.example.com/logout'
  auth0Domain='https://example.auth0.com'
  auth0Theme={{
    primaryColor: '#00cfff',
  }}
  auth0Options={{
    rememberLastLogin: false,
    auth: {
      redirect: false,
    },
  }}
/>
```

The [auth0 integration](https://auth0.com/docs/quickstarts) gives you an out-of-the-box solution for user logins. If you have no need for it, then you may omit these attributes and the login button will just... go away!

| Parameter Name | Description |
|:---------:|:--------:|
| `auth0ClientID` | The client ID is provided from the [auth0 application](https://auth0.com/docs/quickstarts) when you first set it up |
| `auth0Logout` | The allowed logout path you supplied for your auth0 application |
| `auth0Domain` | The authentication domain given to your auth0 application |
| `auth0Theme` | All [theming options](https://auth0.com/docs/libraries/lock/v11/configuration#theming) made available by the auth0 Lock component are valid |
| `auth0Options` | All [display options](https://auth0.com/docs/libraries/lock/v11/configuration#display) made available by the auth0 Lock component are valid |