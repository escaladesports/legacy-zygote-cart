import { css } from 'emotion'

export default function createCSSGrid({
	margin = 5,
	height = `auto`,
	columns = {},
}){
	const mq = {}
	for(let breakpoint in columns){
		const width = `calc(100% * (1/${columns[breakpoint]}) - ${margin * 2}px)`
		if (breakpoint != 0) {
			mq[`@media(min-width:${breakpoint}px)`] = {
				'> *': { width },
			}
		}
		else{
			mq[`> *`] = {
				width,
				height,
				margin,
			}
		}
	}

	return css({
		display: `flex`,
		flexFlow: `row wrap`,
		margin: -margin,
		'> *': {
			height,
			margin,
		},
		...mq,
	})
}