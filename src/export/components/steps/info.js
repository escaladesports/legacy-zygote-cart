import React, { Fragment } from 'react'
import { Subscribe } from 'statable'

import { stepState, productsState, settingsState, customerState }  from '../../state'
import { Name, Email, Phone, Address, Address2, CompanyName, City, State, Zip, Coupon } from '../inputs'
import StepsHeader from '../steps-header'
import Header from '../header'
import Button from '../button'
import attemptSubmitInfo from '../../utils/attempt-submit-info'
import previousStep from '../../utils/previous-step'
import SimpleSummary from '../simple-summary'

export default class InfoStep extends React.Component{
	render() {
		return (
			<Subscribe to={[stepState, settingsState, customerState]}>
				{({ step, vals }, { infoHeader, infoFooter, splitName, coupons, testing, plugins }, { customer, metadataKey }) => (
					<Fragment>
						{(step === `info` || step === `shipping` || step === `payment`) && (
							<form data-form='info'>
								{!!infoHeader && (
									<div>{infoHeader}</div>
								)}
								<StepsHeader step='info' />
								<SimpleSummary />
								<div className='zygoteInfoSection'>
									<Header>Let's get started</Header>
									{splitName &&
										<Fragment>
											<Name
												name='infoFirstName'
												autoComplete='first name'
												step='info'
												label='First Name'
												value={vals.infoFirstName || customer[metadataKey] && customer[metadataKey].first || ``}
											/>
											<Name
												name='infoLastName'
												autoComplete='last name'
												step='info'
												label='Last Name'
												value={vals.infoLastName || customer[metadataKey] && customer[metadataKey].last || ``}
											/>
										</Fragment>
									}
									{!splitName && <Name
										name='infoName'
										autoComplete='shipping name'
										step='info'
										value={vals.infoName || customer[metadataKey] && customer[metadataKey].first && customer[metadataKey].last ? `${customer[metadataKey].first} ${customer[metadataKey].last}` : ``}
									/>}
									<Email
										name='infoEmail'
										autoComplete='shipping email'
										step='info'
										value={vals.infoEmail || customer.email || ``}
									/>
									<Phone
										name='infoPhone'
										autoComplete='shipping tel'
										step='info'
										value={vals.infoPhone || customer[metadataKey] && customer[metadataKey].phone || ``}
										testing={testing}
									/>
								</div>
								{showShipping() && (
									<div className='zygoteInfoSection'>
										<Header>Where should we deliver?</Header>
										<Address
											name='shippingAddress1'
											autoComplete='shipping address-line1'
											step='info'
											value={vals.shippingAddress1 || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.address1 || `` : ``}
										/>
										<div className='zygoteInfoExtra'>
											<div>
												<Address2
													name='shippingAddress2'
													autoComplete='shipping address-line2'
													step='info'
													value={vals.shippingAddress2 || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.address2 || `` : ``}
												/>
											</div>
											<div>
												<CompanyName
													name='shippingCompany'
													autoComplete='shipping org'
													step='info'
													value={vals.shippingCompany || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.company || `` : ``}
												/>
											</div>
										</div>
										<div className='zygoteInfoCityState'>
											<div>
												<City
													name='shippingCity'
													autoComplete='shipping address-level2'
													step='info'
													value={vals.shippingCity || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.city || `` : ``}
												/>
											</div>
											<div>
												<State
													name='shippingState'
													autoComplete='shipping address-level1'
													step='info'
													value={vals.shippingState || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.state || `` : ``}
												/>
											</div>
										</div>
										<Zip
											name='shippingZip'
											autoComplete='shipping postal-code'
											step='info'
											value={vals.shippingZip || customer[metadataKey] && customer[metadataKey].addresses && customer[metadataKey].addresses.shipping ? customer[metadataKey].addresses.shipping.zip || `` : ``}
										/>
									</div>
								)}
								{coupons && <div className='zygoteInfoCoupon'>
									<Coupon />
								</div>}
								{plugins && plugins.map(({ Info }, key) => {
									if (typeof Info === `function`) {
										return <Info key={key} />
									}
								})}
								<div className='zygoteInfoBtn'>
									<Button onClick={attemptSubmitInfo} dataTestid="info-next-step">
										Next Step
									</Button>
								</div>
								<div className='zygoteInfoLink'>
									<Button className='zygoteBtn' secondary={true} onClick={previousStep}>
										Previous Step
									</Button>
								</div>
								{!!infoFooter && (
									<div>{infoFooter}</div>
								)}
							</form>
						)}
					</Fragment>
				)}
			</Subscribe>
		)
	}
	static styles = () => ({
		'.zygoteInfoSection': {
			marginTop: 40,
		},
		'.zygoteInfoExtra': {
			'@media(min-width: 450px)': {
				display: `flex`,
				'> div': {
					width: `50%`,
					padding: `0 10px`,
					':first-of-type': {
						paddingLeft: 0,
					},
					':last-of-type': {
						paddingRight: 0,
					},
				},
			},
		},
		'.zygoteInfoCityState': {
			'@media(min-width: 450px)': {
				display: `flex`,
				'> div': {
					padding: `0 10px`,
					':first-of-type': {
						width: `60%`,
						paddingLeft: 0,
					},
					':last-of-type': {
						width: `40%`,
						paddingRight: 0,
					},
				},
			},
		},
		'.zygoteInfoCoupon': {
			margin: `15px 0`,
		},
		'.zygoteInfoBtn': {
			marginTop: 30,
		},
	})
}

function showShipping(){
	const { products } = productsState.state
	for(let i = products.length; i--;){
		const product = products[i]
		if(!product.noShip){
			return true
		}
	}
	return false
}