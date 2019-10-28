import React from 'react'
import Select from './select'
import { getStateList } from '@escaladesports/us-states-lib'

var states = getStateList(JSON.parse(process.env.GATSBY_SHOW_STATES))

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
				{states.map((state, index) => {
					if(state === `Hawaii` || state === `Alaska`) return null
					return (
						<option
							key={`state${index}`}
							value={state}
						>
							{state}
						</option>
					)
				})}
			</Select>
		)
	}
}