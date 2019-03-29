import React from 'react'
import isZip from 'is-valid-zip'
import Input from './input'

export default class ZipInput extends React.Component {
	static defaultProps = {
		label: `Zip Code`,
		required: true,
		autoComplete: `postal-code`,
		name: `postalCode`,
		formik: false,
		onChange: null,
	}
	validate(val){
		if (!isZip(val)){
			return `Please supply a valid zip code`
		}
	}
	render() {
		const {
			label,
			required,
			autoComplete,
			name,
			step,
			value,
			formik,
			onChange,
		} = this.props
		return (
			<Input
				autoComplete={autoComplete}
				label={label}
				required={required}
				validators={[this.validate]}
				name={name}
				step={step}
				value={value}
				formik={formik}
				onChange={onChange}
			/>
		)
	}
}