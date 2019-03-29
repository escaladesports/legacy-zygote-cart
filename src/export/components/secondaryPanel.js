import React from 'react'
import classNames from 'classnames'


export default class SecondaryPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			content: null,
		}
		this.open = this.open.bind(this)
		this.close = this.close.bind(this)
	}

	open(content) {
		this.setState({ open: true, content })
	}

	close(event) {
		if (event) event.stopPropagation()
		this.setState({ open: false })
	}

	render() {
		return (
			<section
				className={classNames(
					`zygoteSecondaryPanel`,
					this.state.open && `zygoteSecondaryPanelOpen`,
				)}
			>
				<div className='zygoteSecondaryBg' onClick={(e) => this.close(e)}></div>
				<div>
					<button
						role='button'
						className='zygoteCloseButton'
						onClick={this.close}
					>×</button>
					{this.state.content}
				</div>
			</section>
		)
	}

	static styles = () => ({
		'.zygoteSecondaryPanel': {
			position: `fixed`,
			top: 0,
			bottom: 0,
			right: 0,
			width: `485px`,
			maxWidth: `100%`,
			backgroundColor: `#fff`,
			transform: `translateX(110%)`,
			transition: `transform .3s`,
			boxShadow: `-3px 0 4px rgba(0,0,0,0.2)`,
			padding: `20px`,
			paddingTop: `30px`,
			zIndex: 9,
		},
		'.zygoteSecondaryBg': {
			position: `fixed`,
			top: 0,
			bottom: 0,
			left: `-50vw`,
			visibility: `hidden`,
			opacity: 0,
			transition: `opacity .3s, visibility .3s`,
			width: `100%`,
		},
		'.zygoteSecondaryPanelOpen': {
			transform: `translateX(0%)`,
			'.zygoteSecondaryBg': {
				visibility: `visible`,
				opacity: 1,
			},
		},
	})
}