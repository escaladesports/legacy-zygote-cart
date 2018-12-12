import React from 'react'
import Auth0Lock from 'auth0-lock'
import { Subscribe } from 'statable'

import settingsState from '../../state/settings'
import customerState from '../../state/customer'

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}

	componentDidMount() {
		if (settingsState.state.auth0ClientID && settingsState.state.auth0Domain) {
			this.lock = new Auth0Lock(
				settingsState.state.auth0ClientID,
				settingsState.state.auth0Domain,
				{
					autoclose: true,
					closeable: true,
					theme: {
						logo: `https://www.escaladesports.com/uploads/icon.png`,
						...settingsState.state.auth0Theme,
					},
					languageDictionary: {
						title: `Log In`,
						emailPlaceholder: `something@youremail.com`,
					},
					...settingsState.state.auth0Options,
				}
			)

			this.lock.on(`authenticated`, (authResult) => {
				// Use the token in authResult to getUserInfo() and save it to localStorage
				this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
					if (error) {
						return
					}
					localStorage.setItem(`accessToken`, authResult.accessToken) // eslint-disable-line no-undef
					localStorage.setItem(`profile`, JSON.stringify(profile)) // eslint-disable-line no-undef
					customerState.setState({ customer: profile })
				})
			})

			this.lock.checkSession({}, (err, authResult) => {
				if (err) {
					return
				}
				this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
					if (error) {
						return
					}
					localStorage.setItem(`accessToken`, authResult.accessToken) // eslint-disable-line no-undef
					localStorage.setItem(`profile`, JSON.stringify(profile)) // eslint-disable-line no-undef
					customerState.setState({ customer: profile })
				})
			})
		}
	}

	logout() {
		this.lock.logout({
			returnTo: settingsState.state.auth0Logout,
		})
		localStorage.removeItem(`profile`) // eslint-disable-line no-undef
		customerState.reset()
	}

	render() {
		return (
			<Subscribe to={customerState}>
				{({ customer }) => (
					<div>
						{this.lock && !customer && <button className="zygoteBtn zygoteBtnSmall zygoteSecondaryBtn" onClick={() => this.lock.show()}>Log in</button>}
						{this.lock && customer && 
							<div>
								<div>Welcome {customer.nickname}!</div>
								<button className="zygoteBtn zygoteBtnSmall zygotePrimaryBtn" onClick={() => this.logout()}>Log out</button>
							</div>
						}
					</div>
				)}
			</Subscribe>
		)
	}
}

