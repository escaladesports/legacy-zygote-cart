import React, { Fragment } from 'react'
import { Subscribe } from 'statable'

import stepState from '../../state/step'
import shippingState from '../../state/shipping'
import settingsState from '../../state/settings'
import StepsHeader from '../steps-header'
import Button from '../button'
import ProductList from '../product-list'
import Totals from '../totals'
import ShippingMethods from '../shipping-methods'
import nextStep from '../../utils/next-step'
import previousStep from '../../utils/previous-step'
import config from '../../zygote.config'

export default class ShippingStep extends React.Component{
	render() {
		return (
			<Subscribe to={[stepState, shippingState, settingsState]}>
				{({ step }, { loading }, { paymentHeader, paymentFooter }) => (
					<Fragment>
						{(step === `info` || step === `shipping` || step === `payment`) && (
							<form data-form='shipping' data-testid='shipping-step'>
								{!!paymentHeader && (
									<div>{paymentHeader}</div>
								)}
								<StepsHeader step='shipping' />
								<div className='zygoteShippingSection'>
									<ShippingMethods />
								</div>
								<div className='zygoteShippingSection'>
									<h2>Order Summary</h2>
									<ProductList editable={false} />
									<Totals />
								</div>
								{config.plugins && config.plugins.map(({ Shipping }, key) => {
									if (typeof Shipping === `function`) {
										return <Shipping key={key} />
									}
								})}
								<div className='zygoteShippingBtn'>
									<Button
										onClick={loading ? null : nextStep}
										disabled={loading ? true : false}
									>
										Next Step
									</Button>
								</div>
								<div className='zygoteInfoLink'>
									<Button className='zygoteBtn' secondary={true} onClick={previousStep}>
										Previous Step
									</Button>
								</div>
								{!!paymentFooter && (
									<div>{paymentFooter}</div>
								)}
							</form>
						)}
					</Fragment>
				)}
			</Subscribe>

		)
	}
	static styles = () => ({
		'.zygoteShippingSection': {
			marginTop: 40,
		},
		'.zygoteShippingBtn': {
			marginTop: 30,
		},
	})
}