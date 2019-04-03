import React, { Fragment } from 'react'
import Auth0Lock from 'auth0-lock'
import { Subscribe } from 'statable'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'
import 'rc-tabs/assets/index.css'
import { Formik, Field, Form } from 'formik'
import fetch from 'isomorphic-fetch'

import { stepState, settingsState, customerState } from '../../state'
import { Name, Email, Phone, Address, Address2, CompanyName, City, State, Zip } from '../inputs'
import Button from '../button'
import centsToDollars from '../../utils/cents-to-dollars'

export default class Login extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
		this.use = this.use.bind(this)
	}

	componentDidMount() {
		const { auth0ClientID, auth0Namespace, auth0Domain, auth0Theme = {}, auth0Options = { auth: {} } } = settingsState.state

		if (auth0ClientID && auth0Domain) {
			this.lock = new Auth0Lock(
				auth0ClientID,
				auth0Domain,
				{
					autoclose: true,
					closeable: true,
					theme: {
						logo: `https://www.escaladesports.com/uploads/icon.png`,
						...auth0Theme,
					},
					languageDictionary: {
						title: `Log In`,
						emailPlaceholder: `something@youremail.com`,
					},
					additionalSignUpFields: [
						{
							name: `first`,
							placeholder: `First Name`,
						},
						{
							name: `last`,
							placeholder: `Last Name`,
						},
					],
					...auth0Options,
					auth: {
						params: {
							scope: `openid profile email update:current_user_metadata create:current_user_metadata`,
						},
						audience: `https://${auth0Domain}/api/v2/`,
						...auth0Options.auth,
					},
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
					customerState.setState({ customer: profile, metadataKey: `${auth0Namespace}/user_metadata` })

					if (profile && profile[`${auth0Namespace}/user_metadata`] && profile[`${auth0Namespace}/user_metadata`].orders) { // eslint-disable-line no-undef
						fetchOrders(profile[`${auth0Namespace}/user_metadata`].orders) // eslint-disable-line no-undef
					}
				})
			})

			this.lock.on(`authorization_error`, (error) => {
				this.lock.show({
					flashMessage: {
						type: `error`,
						text: error.errorDescription,
					},
				})
			})

			this.lock.on(`signup submit`, () => {
				this.lock.show({
					flashMessage: {
						type: `success`,
						text: `Please check your email to finish signing up!`,
					},
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
					customerState.setState({ customer: profile, metadataKey: `${auth0Namespace}/user_metadata` })

					if (profile && profile[`${auth0Namespace}/user_metadata`] && profile[`${auth0Namespace}/user_metadata`].orders) { // eslint-disable-line no-undef
						fetchOrders(profile[`${auth0Namespace}/user_metadata`].orders) // eslint-disable-line no-undef
					}
				})
			})
		}
	}

	logout() {
		localStorage.removeItem(`profile`) // eslint-disable-line no-undef
		localStorage.removeItem(`accessToken`) // eslint-disable-line no-undef
		customerState.reset()
		this.lock.logout({
			returnTo: settingsState.state.auth0Logout,
		})
	}

	use(values, callback = null) {
		const newInfo = {
			infoEmail: values.auth0Email,
			infoPhone: values.auth0Phone,
			shippingAddress1: values.auth0Address1,
			shippingAddress2: values.auth0Address2,
			shippingCompany: values.auth0Company,
			shippingCity: values.auth0City,
			shippingState: values.auth0State,
			shippingZip: values.auth0Zip,
		}		
		
		if (settingsState.state.splitName) {
			newInfo.infoFirstName = values.auth0FirstName
			newInfo.infoLastName = values.auth0LastName
		}
		else {
			newInfo.infoName = `${values.auth0FirstName} ${values.auth0LastName}`
		}
		stepState.setState({ vals: newInfo })
		if (typeof callback == `function`) {
			callback()
		}
	}

	render() {
		const { panel } = this.props
		const { auth0Domain } = settingsState.state

		const content = (
			<Subscribe to={customerState}>
				{({ customer, metadataKey, orders }) => (
					<section>
						<h1>Welcome back!</h1>
						<h2>This is what we have on file for you:</h2>
						<Tabs
							defaultActiveKey="0"
							renderTabBar={()=><ScrollableInkTabBar />}
							renderTabContent={()=><TabContent />}
						>
							{customer[metadataKey] && 
								<TabPane tab='Shipping Information' key="0">
									<Formik
										initialValues={{ 
											auth0FirstName: customer[metadataKey].first || ``,
											auth0LastName: customer[metadataKey].last || ``,
											auth0Email: customer.email || ``,
											auth0Phone: customer[metadataKey].phone || ``,
											auth0Address1: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.address1 || `` : ``,
											auth0Address2: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.address2 || `` : ``,
											auth0Company: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.company || `` : ``,
											auth0City: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.city || `` : ``,
											auth0State: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.state || `` : ``,
											auth0Zip: customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.zip || `` : ``,
										}}
										onSubmit={(values, actions) => {
											const apiCall = {
												user_metadata: {
													first: values.auth0FirstName,
													last: values.auth0LastName,
													phone: values.auth0Phone,
													addresses: {
														shipping: {
															address1: values.auth0Address1,
															address2: values.auth0Address2,
															company: values.auth0Company,
															city: values.auth0City,
															state: values.auth0State,
															zip: values.auth0Zip,
														},
													},
												},
											}

											const connectionType = customer.sub.split(`|`)
											if (values.auth0Email != customer.email && connectionType.length > 0 && connectionType[0] == `auth0`) {
												apiCall.email = values.auth0Email
												apiCall.connection = `Username-Password-Authentication`
											}
											
											fetch(`https://${auth0Domain}/api/v2/users/${customer.sub}`, {
												method: `PATCH`,
												body: JSON.stringify(apiCall),
												headers: {
													'Authorization': `Bearer ${localStorage.accessToken}`, // eslint-disable-line no-undef
													'Content-Type': `application/json`,
												},
											})
												.then(res => res.json())
												.then(res => {
													const newInfo = {
														...customer,
														email: res.email || customer.email,
													}
													newInfo[metadataKey] = res.user_metadata
													localStorage.setItem(`profile`, JSON.stringify(newInfo)) // eslint-disable-line no-undef
													customerState.setState({ customer: newInfo })
												})
												.then(actions.setSubmitting(false))
												.then(panel.close())
										}}
										render={({ isSubmitting/*, values*/ }) => {
											return (
												<Form>
													<Field name="auth0FirstName" render={({ field }) => (
														<Name
															{...field}
															autoComplete='first name'
															label='First Name'
															required={false}
															formik={true}
														/>
													)} />
													<Field name="auth0LastName" render={({ field }) => (
														<Name
															{...field}
															autoComplete='last name'
															label='Last Name'
															required={false}
															formik={true}
														/>
													)} />
													<Field name="auth0Email" render={({ field }) => (
														<Email
															{...field}
															required={false}
															formik={true}
														/>
													)} />
													<Field name="auth0Phone" render={({ field }) => (
														<Phone
															{...field}
															autoComplete='shipping tel'
															required={false}
															formik={true}
														/>
													)} />
													<div className='zygoteInfoSection'>
														<Field name="auth0Address1" render={({ field }) => (
															<Address
																{...field}
																autoComplete='shipping address-line1'
																required={false}
																formik={true}
															/>
														)} />
														<div className='zygoteInfoExtra'>
															<div>
																<Field name="auth0Address2" render={({ field }) => (
																	<Address2
																		{...field}
																		autoComplete='shipping address-line2'
																		required={false}
																		formik={true}
																	/>
																)} />
															</div>
															<div>
																<Field name="auth0Company" render={({ field }) => (
																	<CompanyName
																		{...field}
																		autoComplete='shipping org'
																		required={false}
																		formik={true}
																	/>
																)} />
															</div>
														</div>
														<div className='zygoteInfoCityState'>
															<div>
																<Field name="auth0City" render={({ field }) => (
																	<City
																		{...field}
																		autoComplete='shipping address-level2'
																		required={false}
																		formik={true}
																	/>
																)} />
															</div>
															<div>
																<Field name="auth0State" render={({ field }) => (
																	<State
																		{...field}
																		autoComplete='shipping address-level1'
																		required={false}
																		formik={true}
																	/>
																)} />
															</div>
														</div>
														<Field name="auth0Zip" render={({ field }) => (
															<Zip
																{...field}
																autoComplete='shipping postal-code'
																required={false}
																formik={true}
															/>
														)} />
													</div>
													<div className='zygoteInfoBtn'>
														<Button disabled={isSubmitting} type="submit">
															Update Information
														</Button>
													</div>
													<div className='zygoteInfoLink'>
														<Button className='zygoteBtn' secondary={true} onClick={panel.close}>
															Looks Good!
														</Button>
													</div>
													{/* <div className='zygoteInfoLink'>
														<Button className='zygoteBtn zygoteBtnUse' onClick={() => this.use(values, panel.close)}>
															Use This Address
														</Button>
													</div> */}
												</Form>
											)
										}} />
								</TabPane>
							}
							<TabPane tab='Recent Orders' key="1">
								<table className='zygoteOrderTable'>
									<thead>
										<tr>
											<th>Order ID</th>
											{/* <th>Purchase</th> */}
											<th>Price</th>
											<th>Date</th>
										</tr>
									</thead>
									<tbody>
										{customer[metadataKey].orders.length > 0 && orders.length > 0 && orders.map((order, i) => {
											const date = new Date(order.time * 1000)	
											return (
												<tr key={i}>
													<td>{order.id}</td>
													{/* <td>{order.products}</td> */}
													<td>${centsToDollars(order.amount)}</td>
													<td>{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</td>
												</tr>
											)
										})}
										{customer[metadataKey].orders.length > 0 && orders.length == 0 && <tr><td colSpan='4'>Loading...</td></tr>}
										{customer[metadataKey].orders && customer[metadataKey].orders.length == 0 && <tr><td colSpan='4'>There are no recent orders on this account.</td></tr>}
										{!customer[metadataKey].orders && customer[metadataKey].orders.length == 0 && <tr><td colSpan='4'>There are no recent orders on this account.</td></tr>}
									</tbody>
								</table>
							</TabPane>
						</Tabs>
					</section>
				)}
			</Subscribe>
		)

		return (
			<Subscribe to={customerState}>
				{({ customer, metadataKey }) => (
					<Fragment>
						{this.lock && Object.keys(customer).length == 0 && <button className="zygoteBtn zygoteBtnSmall zygoteSecondaryBtn zygoteLogin" onClick={() => this.lock.show()}>Log in</button>}
						{this.lock && Object.keys(customer).length > 0 && 
							<div className="zygoteLoginArea">
								<button className="zygoteBtn zygoteBtnSmall zygotePrimaryBtn zygoteLogout" onClick={() => this.logout()}>Log out</button>
								<button className="zygoteAdditionalInfo" onClick={() => panel.open(content)} aria-label="Edit user information" title="Edit user information">
									Welcome <span>{customer[metadataKey] && customer[metadataKey].first ? customer[metadataKey].first : customer.nickname}</span>!
								</button>
							</div>
						}
					</Fragment>
				)}
			</Subscribe>
		)
	}

	static styles = ({ overlayColor, primaryColor }) => ({
		'.zygoteLoginArea': {
			paddingRight: `40px`,
			marginBottom: `15px`,	
			display: `inline-block`,
			border: `1px solid ${primaryColor}`,
			borderRadius: `15px`,
		},
		'.zygoteAdditionalInfo': {
			cursor: `pointer`,
			border: `none`,
			// borderBottom: `1px solid`,
			fontSize: `14px`,
			span: {
				textDecoration: `underline`,
			},
		},
		'.zygoteSecondaryPanel .rc-tabs-tab-active, .zygoteSecondaryPanel .rc-tabs-tab-active:hover': {
			color: primaryColor,
		},
		'.zygoteSecondaryPanel .rc-tabs-ink-bar': {
			backgroundColor: primaryColor,
		},
		'.zygoteSecondaryPanel .rc-tabs-tab:hover': {
			color: overlayColor,
		},
		'.zygoteLogout, .zygoteLogin': {
			display: `inline-block`,
			marginRight: `10px`,
			marginTop: `0`,
		},
		'.zygoteLogin': {
			marginBottom: `15px`,
		},
		'.zygoteOrderTable': {
			width: `100%`,
			overflow: `auto`,
			marginTop: `15px`,
			fontSize: `12px`,
			'tr:nth-child(even)': {
				background: `#e8e8e8`,
			},
			td: {
				padding: `15px`,
				wordBreak: `break-all`,
			},
		},
	})
}

const fetchOrders = async (orderids) => {
	let orders = []
	await orderids.map(async orderid => {
		const parts = orderid.split(`|`)
		if (parts.length >= 2) {
			const type = parts[0]
			const id = parts[1]
			if (type == `stripe`) {
				if (settingsState.state.stripeRestrictedKey) {
					await fetch(`https://api.stripe.com/v1/orders/${id}`, {
						method: `GET`,
						headers: {
							'Authorization': `Bearer ${settingsState.state.stripeRestrictedKey}`,
							'Content-Type': `application/json`,
						},
					})
						.then(res => res.json())
						.then(order => {
							orders.push({
								id: id,
								products: order.items.map(item => item.description),
								amount: order.amount,
								time: order.updated,
							})
						})
				}
			}
			else {
				for (let i = 0; i < settingsState.state.plugins.length; i++) {
					if (settingsState.state.plugins[i].fetchOrders === `function`) {
						orders.push(await settingsState.state.plugins[i].fetchOrders(type, id))
					}
				}
			}
		}
	})

	orders.sort((a,b) => {
		if (!a.time && !b.time) return 0
		return a.time > b.time ? 1 : b.time > a.time ? -1 : 0
	})
	customerState.setState({ orders })
}

export const postSuccess = async ({ response }) => {
	const { customer, metadataKey } = customerState.state
	const { auth0Domain } = settingsState.state

	if (!customer || !auth0Domain) return

	let newOrders = []
	if (Array.isArray(response.meta.orderId)) {
		newOrders = response.meta.orderId
	}
	else {
		newOrders = [response.meta.orderId]
	}

	const apiCall = {
		user_metadata: {
			orders: customer[metadataKey].orders ? [...customer[metadataKey].orders, ...newOrders] : newOrders,
		},
	}

	await fetch(`https://${auth0Domain}/api/v2/users/${customer.sub}`, {
		method: `PATCH`,
		body: JSON.stringify(apiCall),
		headers: {
			'Authorization': `Bearer ${localStorage.accessToken}`, // eslint-disable-line no-undef
			'Content-Type': `application/json`,
		},
	})
		.then(res => res.json())
		.then(res => {
			const newInfo = {
				...customer,
			}
			newInfo[metadataKey] = res.user_metadata
			localStorage.setItem(`profile`, JSON.stringify(newInfo)) // eslint-disable-line no-undef
			customerState.setState({ customer: newInfo })
		})
} 