import React from 'react'
import { Subscribe } from 'statable'
import state from './state'

export default class RouteUpdateDelayed extends React.Component{
	render(){
		return (
			<Subscribe to={state}>
				{({ delayed }) => {
					if (delayed || this.props.simulate) return this.props.children
					return null
				}}
			</Subscribe>
		)
	}
}