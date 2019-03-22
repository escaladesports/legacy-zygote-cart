import React from 'react'
import { css, keyframes } from 'emotion'
import { primaryColor } from '../styles/colors'

export default class RouteDelayedAnimation extends React.Component {
	render() {
		return (
			<div className={outerStyles}>
				<div className={innerStyles} />
			</div>
		)
	}
}

const outerStyles = css({
	position: `fixed`,
	top: 0,
	right: 0,
	left: 0,
	overflow: `hidden`,
	height: 3,
})

const animation = keyframes({
	from: {
		transform: `translateX(-100%)`,
	},
	to: {
		transform: `translateX(0%)`,
	},
})

const innerStyles = css({
	position: `absolute`,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	animation: `${animation} 4s linear infinite`,
	background: primaryColor,
})