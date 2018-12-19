import React, { Fragment } from 'react'

import CreditCard from '../../components/inputs/credit-card'
import Expiration from '../../components/inputs/expiration'
import Cvc from '../../components/inputs/cvc'

export default class StandardBilling extends React.Component {
	render() {
		return (
			<Fragment>
				<CreditCard step='billing' />
				<div className='zygotePaymentExpCVC'>
					<div>
						<Expiration step='billing' />
					</div>
					<div>
						<Cvc step='billing' />
					</div>
				</div>
			</Fragment>
		)
	}
}

