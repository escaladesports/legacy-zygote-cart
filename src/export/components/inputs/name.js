import React from 'react'
import Input from './input'

export default class NameInput extends React.Component {
	static defaultProps = {
		label: `Full Name`,
		autoComplete: `name`,
		required: true,
		name: `name`,
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