import React from 'react'
import { css } from 'emotion'
import { white } from '../styles/colors'

export default class Modal extends React.Component{
	render(){
		return (
			<div
				className={bgStyles}
				style={{ display: this.props.open ? `block` : `none` }}
				onClick={this.props.onClose}
			>
				<div className={dialogStyles} onClick={stopPropagation}>
					<div className={closeStyles} onClick={this.props.onClose}>
						×
					</div>
					<div className={contentStyles}>
						{this.props.children}
					</div>
				</div>
				{this.props.open && (
					<style dangerouslySetInnerHTML={{__html: `body{overflow:hidden}`}} />
				)}
			</div>
		)
	}
}

function stopPropagation(e){
	e.stopPropagation()
}

const modalPadding = 15
const closeSize = 30
const maxWidth = 900

const bgStyles = css({
	background: `rgba(0, 0, 0, .4)`,
	position: `fixed`,
	top: 0,
	right: 0,
	left: 0,
	bottom: 0,
	overflowY: `auto`,
})

const dialogStyles = css({
	background: white,
	position: `absolute`,
	minHeight: `100%`,
	width: `100%`,
	padding: modalPadding,
	[`@media (min-width: ${maxWidth}px)`]: {
		top: 30,
		left: `50%`,
		transform: `translateX(-50%)`,
		marginBottom: 30,
		maxWidth: maxWidth,
		minHeight: 0,
	},
})

const closeStyles = css({
	cursor: `pointer`,
	position: `absolute`,
	fontSize: closeSize,
	lineHeight: `${closeSize}px`,
	top: modalPadding,
	right: modalPadding,
})

const contentStyles = css({
	marginTop: modalPadding * 2,
})