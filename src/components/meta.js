import React from 'react'
import { Helmet } from 'react-helmet'
import {
	title as siteTitle,
	description as siteDescription,
} from '../../site-config'

export default class Meta extends React.Component {
	render() {
		const { title, description } = this.props
		let pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
		let pageDescription = description || siteDescription
		return (
			<Helmet>
				<title>{pageTitle}</title>
				<meta name='description' content={pageDescription} />
			</Helmet>
		)
	}
}