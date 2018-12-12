import { css } from 'emotion'
import { styles as cart } from '../components/cart'
import { styles as addedToCartMsg } from '../components/added-to-cart-message'
import { styles as button } from '../components/button'
import { styles as errors } from '../components/errors'
import { styles as header } from '../components/header'
import { styles as info } from '../components/info'
import { styles as loading } from '../components/loading-animation'
import { styles as processing } from '../components/processing'
import { styles as prodItem } from '../components/product-list-item'
import { styles as prodList } from '../components/product-list'
import { styles as shippingMethods } from '../components/shipping-methods'
import { styles as shippingMethodsList } from '../components/shipping-methods/list'
import { styles as smallButton } from '../components/small-button'
import { styles as stepsHeader } from '../components/steps-header'
import { styles as totals } from '../components/totals'
import { styles as cardList } from '../components/card-list'
import { styles as securityIcon } from '../components/card-list/security'
import { styles as checkbox } from '../components/inputs/checkbox'
import { styles as radio } from '../components/inputs/radio'
import { styles as coupon } from '../components/inputs/coupon'
import { styles as input } from '../components/inputs/input'
import { styles as select } from '../components/inputs/select'
import { styles as toggle } from '../components/inputs/toggle'
import { styles as cardInput } from '../components/inputs/credit-card'
import { styles as cartStep } from '../components/steps/cart'
import { styles as infoStep } from '../components/steps/info'
import { styles as shippingStep } from '../components/steps/shipping-methods'
import { styles as paymentStep } from '../components/steps/payment'
import { styles as successStep } from '../components/steps/success'
import { styles as simpleSummary } from '../components/simple-summary'
import { styles as stripe } from '../components/stripe'
import { styles as stripeInput } from '../components/stripe/input'
import { styles as stripePaymentRequest } from '../components/stripe/payment-request'
import { styles as applePay } from '../components/apple-pay-button'
import printStyles from './print'

export default function styles(opts){
	return css({
		...addedToCartMsg(opts),
		...button(opts),
		...cart(opts),
		...errors(opts),
		...header(opts),
		...info(opts),
		...loading(opts),
		...processing(opts),
		...prodItem(opts),
		...prodList(opts),
		...shippingMethods(opts),
		...shippingMethodsList(opts),
		...smallButton(opts),
		...stepsHeader(opts),
		...totals(opts),
		...cardList(opts),
		...securityIcon(opts),
		...checkbox(opts),
		...radio(opts),
		...coupon(opts),
		...input(opts),
		...select(opts),
		...toggle(opts),
		...cartStep(opts),
		...infoStep(opts),
		...shippingStep(opts),
		...paymentStep(opts),
		...successStep(opts),
		...stripe(opts),
		...stripeInput(opts),
		...stripePaymentRequest(opts),
		...simpleSummary(opts),
		...applePay(opts),
		...cardInput(opts),
		...printStyles,
	})
}