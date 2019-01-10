import React, { Fragment } from 'react'

import NameInput from '../../components/inputs/name'
import CreditCard from '../../components/inputs/credit-card'
import Expiration from '../../components/inputs/expiration'
import Cvc from '../../components/inputs/cvc'

export class Payment extends React.Component {
	render() {
		return (
			<Fragment>
				<NameInput name='billingName' step='billing' />
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

