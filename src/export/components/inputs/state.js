import React from 'react'
import states from 'datasets-us-states-names'
import Select from './select'

export default class StateInput extends React.Component {
	static defaultProps = {
		label: `State`,
		autoComplete: `address-level1`,
		required: true,
		name: `state`,
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
			<Select
				label={label}
				required={required}
				autoComplete={autoComplete}
				name={name}
				step={step}
				value={value}
				formik={formik}
				onChange={onChange}
			>
				{states.map((state, index) => (
					<option
						key={`state${index}`}
						value={state}
					>
						{state}
					</option>
				))}
			</Select>
		)
	}
}