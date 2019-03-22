import { css } from 'emotion'
import {
	primaryColor,
	primaryActiveColor,
} from '../colors'

export default css({
	color: primaryColor,
	textDecoration: `none`,
	'&:focus, &:hover, &:active': {
		textDecoration: `underline`,
		color: primaryActiveColor,
	},
})