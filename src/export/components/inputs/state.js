import React from 'react'
import states from 'datasets-us-states-names'
import Select from './select'

export default class StateInput extends React.Component {
	static defaultProps = {
		label: `State`,
		autoComplete: `address-level1`,
		required: true,
		name: `state`,
	}
	render() {
		const {
			label,
			autoComplete,
			required,
			name,
			step,
			value,
		} = this.props
		return (
			<Select
				label={label}
				required={required}
				autoComplete={autoComplete}
				name={name}
				step={step}
				value={value}
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