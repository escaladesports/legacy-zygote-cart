import React, { Fragment } from 'react'
import { css } from 'emotion'
import RouteDelayed from '../../../plugins/route-delayed-animation'
import Header from '../header'
import Footer from '../footer'
import RouteDelayedAnimation from '../route-delayed-animation'
import {
	white,
	primaryColor,
} from '../../styles/colors'
import {
	primaryFont,
	secondaryFont,
} from '../../styles/fonts'
import linkMixin from '../../styles/mixins/link'
import '../../styles/global.css'

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<div className={layoutStyles}>
					<Header />
					<div className={contentStyles}>
						<main>{this.props.children}</main>
					</div>
					<Footer />
				</div>
				<RouteDelayed>
					<RouteDelayedAnimation />
				</RouteDelayed>
			</Fragment>
		)
	}
}


const layoutStyles = css({
	minHeight: `100vh`,
	display: `flex`,
	flexDirection: `column`,
	fontFamily: secondaryFont,
	a: linkMixin,
	p: {
		lineHeight: `28px`,
	},
	img: {
		maxWidth: `100%`,
	},
	'h1, h2, h3': {
		fontFamily: primaryFont,
		textTransform: `uppercase`,
	},
	li: {
		lineHeight: `1.3em`,
		marginBottom: `4px`,
	},
	'::selection': {
		color: white,
		backgroundColor: primaryColor,
	},
})

const contentStyles = css({
	margin: `0 auto`,
	padding: `0 30px`,
	maxWidth: 960,
	width: `100%`,
	flex: `1 0 auto`,
})