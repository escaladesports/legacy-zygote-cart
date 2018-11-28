// HTML templates
import usdFormatter from 'usd-formatter'
import states from 'datasets-us-states-abbr-names'
import padlock from '../img/padlock.svg'
import cart from '../img/cart.svg'
import truck from '../img/truck.svg'
import card from '../img/card.svg'
import check from '../img/check.svg'
import { setData } from './data-set'


// Build state options
let stateEls = []
for(let i in states){
	if(states[i] === 'Alaska' || states[i] === 'Hawaii') continue
	stateEls.push(`<option value=${i}>${states[i]}</option>`)
}
stateEls = stateEls.join('')

// Build year options
let year = new Date().getFullYear()
let yearEls = []
for(let i = 0; i < 16; i++){
	yearEls.push(`<option value=${year}>${year}</option>`)
	year++
}
yearEls = yearEls.join('')

exports.cart = () => {
	const el = document.createElement('div')
	el.className = 'zygoteContainer zygoteOn1'
	const html = `
		<div class="zygoteModal">
			<div class="zygoteClose">&#215;</div>
			<div class="zygoteHeader">
				<h1>Your Cart</h1>
			</div>
			<ul class="zygoteTabs">
				<li class="zygoteCartTab">${cart} Your Cart</li>
				<li class="zygoteShipTab">${truck} Shipping Address</li>
				<li class="zygotePayTab">${card} Payment Method</li>
				<li class="zygoteConfirmTab">${check} Confirm Order</li>
			</ul>
			<ul class="zygoteMsgs"></ul>
			<form class="zygoteForm">

				<div class="zygoteStep1 zygoteStep"></div>

				<div class="zygoteStep2 zygoteStep">

					<div class="zygoteTable">
						<div class="zygoteRow">
							<div class="zygoteSection">
								<div class="zygoteShippingFirst">
									<label for="zygoteShippingFirst">First Name</label>
									<input type="text" id="zygoteShippingFirst" name="shippingFirst" autocomplete="given-name" required maxlength="100" />
								</div>

								<div class="zygoteShippingLast">
									<label for="zygoteShippingLast">Last Name</label>
									<input type="text" id="zygoteShippingLast" name="shippingLast" autocomplete="family-name" required maxlength="100" />
								</div>

								<div class="zygoteShippingAddress1">
									<label for="zygoteShippingAddress1">Street Address</label>
									<input type="text" id="zygoteShippingAddress1" name="shippingAddress1" autocomplete="address-line1" required maxlength="200" />
								</div>

								<div class="zygoteShippingAddress2">
									<label for="zygoteShippingAddress2">Street Address 2 (Not required)</label>
									<input type="text" id="zygoteShippingAddress2" name="shippingAddress2" autocomplete="address-line2" maxlength="200" />
								</div>
							</div>

							<div class="zygoteSection">
								<div class="zygoteShippingCity">
									<label for="zygoteShippingCity">City</label>
									<input type="text" id="zygoteShippingCity" name="shippingCity" autocomplete="address-level2" required maxlength="100" />
								</div>

								<div class="zygoteShippingState">
									<label for="zygoteShippingState">State</label>
									<select type="text" id="zygoteShippingState" name="shippingState" autocomplete="address-level1" required>
										<option disabled selected></option>
										${stateEls}
									</select>
								</div>

								<div class="zygoteShippingZip">
									<label for="zygoteShippingZip">Zip / Postal Code</label>
									<input type="text" id="zygoteShippingZip" name="shippingZip" autocomplete="postal-code" required inputmode="numeric" pattern="[0-9]*" maxlength="20" />
								</div>
							</div>

							<div class="zygoteSection">

								<div class="zygoteShippingPhone">
									<label for="zygoteShippingPhone">Phone</label>
									<input type="text" id="zygoteShippingPhone" name="shippingPhone" autocomplete="tel-national" inputmode="numeric" pattern="[0-9]*" maxlength="20" />
								</div>

								<div class="zygoteShippingEmail">
									<label for="zygoteShippingEmail">Email</label>
									<input type="email" id="zygoteShippingEmail" autocomplete="email" name="shippingEmail" required maxlength="200" />
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="zygoteStep3 zygoteStep">

					<div class="zygoteTable">

						<div class="zygoteRow">
							<div class="zygoteSection">
								<div class="zygoteBillingNumber">
									<label for="zygoteBillingNumber">Card Number</label>
									<input type="text" id="zygoteBillingNumber" name="billingNumber" autocomplete="cc-number" required inputmode="numeric" pattern="[0-9]*" maxlength="100" />
								</div>

								<div class="zygoteBillingSecurity">
									<label for="zygoteBillingSecurity">CVC</label>
									<input type="text" id="zygoteBillingSecurity" name="billingSecurity" autocomplete="cc-csc" required inputmode="numeric" pattern="[0-9]*" maxlength="10" />
								</div>
							</div>

							<div class="zygoteSection">
								<div class="zygoteBillingMonth">
									<label for="zygoteBillingMonth">Expiration Month</label>
									<select type="text" id="zygoteBillingMonth" autocomplete="cc-exp-month" name="billingMonth" required>
										<option disabled selected></option>
										<option value="January">January</option>
										<option value="February">February</option>
										<option value="March">March</option>
										<option value="April">April</option>
										<option value="May">May</option>
										<option value="June">June</option>
										<option value="July">July</option>
										<option value="August">August</option>
										<option value="September">September</option>
										<option value="October">October</option>
										<option value="November">November</option>
										<option value="December">December</option>
									</select>
								</div>

								<div class="zygoteBillingYear">
									<label for="zygoteBillingYear">Expiration Year</label>
									<select type="text" id="zygoteBillingYear" required autocomplete="cc-exp-year" name="billingYear">
										<option disabled selected></option>
										${yearEls}
									</select>
								</div>
							</div>

							<div class="zygoteSection">
								<label class="zygoteBoxLabel">
									<input type="checkbox" checked name="billingSame" />
									<span>Billing Address Same as Shipping</span>
								</label>
							</div>

						</div>
					</div>
					<div class="zygoteTable zygoteBillingToggle">
						<div class="zygoteRow">

							<div class="zygoteSection">

								<div class="zygoteBillingFirst">
									<label for="zygoteBillingFirst">First Name</label>
									<input type="text" id="zygoteBillingFirst" name="billingFirst" autocomplete="given-name" required maxlength="100" />
								</div>

								<div class="zygoteBillingLast">
									<label for="zygoteBillingLast">Last Name</label>
									<input type="text" id="zygoteBillingLast" name="billingLast" autocomplete="family-name" required maxlength="100" />
								</div>

								<div class="zygoteBillingAddress1">
									<label for="zygoteBillingAddress1">Street Address</label>
									<input type="text" id="zygoteBillingAddress1" name="billingAddress1" autocomplete="address-line1" required maxlength="200" />
								</div>

								<div class="zygoteBillingAddress2">
									<label for="zygoteBillingAddress2">Street Address 2 (Not required)</label>
									<input type="text" id="zygoteBillingAddress2" name="billingAddress2" autocomplete="address-line2" maxlength="200" />
								</div>
							</div>

							<div class="zygoteSection zygoteBillingToggle">
								<div class="zygoteBillingCity">
									<label for="zygoteBillingCity">City</label>
									<input type="text" id="zygoteBillingCity" name="billingCity" autocomplete="address-level2" required maxlength="100" />
								</div>

								<div class="zygoteBillingState">
									<label for="zygoteBillingState">State</label>
									<select type="text" id="zygoteBillingState" name="billingState" autocomplete="address-level1" required>
										<option disabled selected></option>
										${stateEls}
									</select>
								</div>

								<div class="zygoteBillingZip">
									<label for="zygoteBillingZip">Zip / Postal Code</label>
									<input type="text" id="zygoteBillingZip" name="billingZip" autocomplete="postal-code" required inputmode="numeric" maxlength="20" pattern="[0-9]*" />
									<label for="zygoteBillingPhone">Phone</label>
									<input type="text" id="zygoteBillingPhone" name="billingPhone" pattern="[0-9]*" autocomplete="tel-national" required inputmode="numeric" maxlength="20" />
								</div>
							</div>
						</div>

					</div>


					<div class="zygoteChargeInfo">* Charges will appear as Escalade Sports</div>
				</div>

				<div class="zygoteStep4 zygoteStep"></div>
				<div class="zygoteStep5 zygoteStep">
					<h2>Your order has been placed!</h2>
				</div>

				<div class="zygoteProdTable">
					<ul class="zygoteProdHeader">
						<li>Item</li>
						<li>Quantity</li>
						<li>Price</li>
						<li>Remove</li>
					</ul>
					<ul class="zygoteProdList"></ul>
					<ul class="zygoteCouponLine">
						<li class="zygoteCouponHead"></li>
						<li class="zygoteCoupon">
							<label for="zygoteCouponCode">Coupon Code <small>(Applied at checkout)</small></label>
							<input type="text" name="couponCode" id="zygoteCouponCode" placeholder="Coupon Code" />
						</li>
					</ul>

					<div class="zygoteShipOptionLine">
						<h4>Shipping Options</h4>
						<div class="zygoteShippingInputs"></div>
					</div>

					<ul class="zygoteAdjLine"></ul>
					<ul class="zygoteSubLine">
						<li class="zygoteSubHead">Subtotal</li>
						<li class="zygoteSubTotal">$0.00</li>
					</ul>
					<ul class="zygoteShipLine">
						<li class="zygoteShipHead">Shipping</li>
						<li class="zygoteShip">$0.00</li>
					</ul>
					<ul class="zygoteTaxLine">
						<li class="zygoteTaxHead">Tax</li>
						<li class="zygoteTax">$0.00</li>
					</ul>
					<ul class="zygoteTotalLine">
						<li class="zygoteTotalHead">Total</li>
						<li class="zygoteTotal">$0.00</li>
					</ul>
				</div>


				<div class="zygoteStepBtns">
					<button class="zygoteBtn zygotePrev" role="button">Previous Step</button>
					<button class="zygoteBtn zygoteNext" role="button">Next Step</button>
				</div>

				<div class="zygoteEmpty">Your cart is empty.</div>
			</form>

			<div class="zygoteLoader">
				<div class="zygoteLoadAnim">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="zygoteFooter">
				${padlock}
				<span>SSL Secure</span>
			</div>
		</div>
	`
	el.innerHTML = html
	return el
}

exports.product = obj => {
	const el = document.createElement('li')
	el.className = 'zygoteProd'
	setData(el, 'id', obj.id)
	el.innerHTML = `
		<div class="zygoteProdImg">
			<a href="${obj.url}"><img src="${obj.img}" /></a>
		</div>
		<div class="zygoteProdName">
			<div>
				<a href="${obj.url}">${obj.name}</a>
				<div>${obj.desc || ''}</div>
			</div>
		</div>
		<div class="zygoteProdQty">
			<div>
				<div class="zygoteDecrease">-</div>
				<div data-qty>${obj.qty}</div>
				<div class="zygoteIncrease">+</div>
			</div>
		</div>
		<div class="zygoteProdPrice">
			<div>${usdFormatter(obj.price)}</div>
		</div>
		<div class="zygoteProdDelete">
			<div class="zygoteProdX">&#215;</div>
		</div>
	`
	return el
}
