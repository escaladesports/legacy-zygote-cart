import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

export default class Footer extends React.Component{
	render(){
		return (
			<footer className={footerStyles}>
				<ul>
					<li><Link to='/privacy-policy'>Privacy Policy</Link></li>
					<li><a href='/admin/'>CMS</a></li>
				</ul>
			</footer>
		)
	}
}

const footerStyles = css({
	ul: {
		listStyleType: `none`,
		padding: 30,
		margin: 0,
	},
	li: {
		display: `inline-block`,
	},
	a: {
		padding: `0 10px`,
		display: `inline-block`,
	},
	'ul > li': {
		':first-of-type > a': {
			paddingLeft: 0,
		},
		':last-of-type > a': {
			paddingRight: 0,
		},
	},
})