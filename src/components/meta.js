import React from 'react'
import { Helmet } from 'react-helmet'
import {
	title as siteTitle,
	description as siteDescription,
} from '../../site-config'

const Meta = ({ title, description }) => {	  
	const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
	const pageDescription = description || siteDescription
	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta name='description' content={pageDescription} />
		</Helmet>
	)
}


export default Meta
