import React from 'react'
import isPhone from 'is-phone'
import Input from './input'

export default class PhoneInput extends React.Component {
	static defaultProps = {
		autoComplete: `tel`,
		label: `Phone`,
		required: true,
		mask: `(999) 999-9999`,
		name: `phone`,
		testing: false,
		formik: false,
		onChange: null,
	}
	validate(val){
		if (!isPhone(val)){
			return `Please supply a valid phone number`
		}
	}
	render() {
		const {
			autoComplete,
			required,
			label,
			mask,
			name,
			step,
			value,
			testing,
			formik,
			onChange,
		} = this.props
		return (
			<Input
				type='tel'
				autoComplete={autoComplete}
				label={label}
				required={required}
				mask={testing ? false : mask}
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