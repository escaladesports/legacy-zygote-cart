import color from 'color'

const colors = {
	primaryColor: `#00dd00`,
	secondaryColor: `#333`,
	white: `#fff`,
}

colors.primaryActiveColor = color(colors.primaryColor)
	.lighten(.5)
	.rgb()
	.string()

export default colors