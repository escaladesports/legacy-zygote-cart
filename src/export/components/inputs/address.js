import React from 'react'
import Input from './input'

export default class AddressInput extends React.Component {
	static defaultProps = {
		label: `Address`,
		autoComplete: `address-line1`,
		required: true,
		name: `addressLine1`,
		formik: false,
		onChange: null,
	}
	render() {
		const {
			label,
			autoComplete,
			required,
			name,
			step,
			value,
			formik,
			onChange,
		} = this.props
		return (
			<Input
				label={label}
				autoComplete={autoComplete}
				required={required}
				name={name}
				step={step}
				value={value}
				formik={formik}
				onChange={onChange}
			/>
		)
	}
}