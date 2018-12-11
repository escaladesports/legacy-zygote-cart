import React from 'react'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import registerInput from '../../utils/register-input'
import unregisterInput from '../../utils/unregister-input'

export default class Input extends React.Component{
	static defaultProps = {
		inputRef: () => {},
	}
	constructor(props){
		super(props)
		this.state = {
			value: ``,
			focus: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.validate = this.validate.bind(this)
	}
	handleChange(e){
		if(this.props.onChange){
			this.props.onChange(e)
		}
		if (this.input.type === `checkbox`) {
			if (this.input.checked) {
				this.setState({ value: this.input.value })
			}
			else {
				this.setState({ value: `` })
			}
		}
		else {
			this.setState({ value: this.input.value })
		}
	}
	handleFocus(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e)
		}
		this.setState({ focus: true })
	}
	handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(e)
		}
		this.validate()
	}
	validate(){
		this.setState({ focus: false })
		const { value } = this.input

		// Required message
		if (this.props.required && !value){
			return this.setState({ error: `This field is required` })
		}

		// Run validation functions
		const { validators } = this.props
		if (validators) {
			for (let i = 0; i < validators.length; i++) {
				const error = validators[i](value)
				if (error) {
					return this.setState({ error })
				}
			}
		}

		this.setState({ error: false })
	}
	componentDidMount(){
		registerInput(this)
	}
	componentWillUnmount(){
		unregisterInput(this)
	}
	render(){
		const {
			value,
			focus,
			error,
		} = this.state
		const {
			label,
			mask,
			type,
			autoComplete,
			name,
			inputRef,
			checked,
		} = this.props
		return (
			<label
				className={classNames(
					`zygoteInputWrapper`,
					focus && `zygoteInputFocus`,
					error && `zygoteInputErr`,
				)}
				ref={el => this.wrapper = el}
			>
				<span
					className={classNames(
						`zygoteInputLabel`,
						(value || focus) && `zygoteInputLabelMoved`,
					)}
				>
					{label}
				</span>
				{mask && (
					<InputMask
						mask={mask}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						onBlur={this.validate}
						value={value}
					>
						{(inputProps) => (
							<input
								type={type || `text`}
								autoComplete={autoComplete}
								ref={input => {
									this.input = input
									inputRef(input)
								}}
								className='zygoteInput'
								name={name}
								{...inputProps}
							/>
						)}
					</InputMask>
				)}
				{!mask && (
					<input
						type={type || `text`}
						autoComplete={autoComplete}
						ref={input => {
							this.input = input
							inputRef(input)
						}}
						value={this.props.value || value}
						name={name}
						className='zygoteInput'
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						onBlur={this.validate}
						checked={checked}
					/>
				)}
				{error && (
					<span className='zygoteInputErrMsg' data-error>{error}</span>
				)}
			</label>
		)
	}
	static styles = ({ altBackgroundColor, altBorderColor }) => ({
		'.zygoteInputWrapper': {
			position: `relative`,
			display: `block`,
			marginTop: 30,
			fontSize: `.9em`,
			background: altBackgroundColor,
			border: `1px solid ${altBorderColor}`,
			borderRadius: 4,
		},
		'.zygoteInputFocus': {
			border: `1px solid #666`,
		},
		'.zygoteInputErr': {
			color: `#f00`,
			border: `1px solid #f00`,
		},
		'.zygoteInputLabel': {
			position: `absolute`,
			top: -18,
			left: 0,
			fontSize: `.85em`,
			display: `block`,
			opacity: .75,
			transition: `transform .2s`,
			transform: `translate(7px, 30px)`,
		},
		'.zygoteInputLabelMoved': {
			transform: `translate(0px, 0px)`,
		},
		'.zygoteInput': {
			width: `100%`,
			display: `block`,
			background: `transparent`,
			border: 0,
			borderRadius: 4,
			fontSize: `16px`,
			padding: `0 10px`,
			height: 36,
			outline: `none`,
		},
		'.zygoteInputErrMsg': {
			position: `absolute`,
			display: `inline-block`,
			fontSize: `.75em`,
			right: 0,
			top: 42,
		},
	})
}