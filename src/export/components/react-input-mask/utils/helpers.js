export function isDOMElement(element) {
	return typeof window.HTMLElement === `object`
		? element instanceof window.HTMLElement // DOM2
		: element.nodeType === 1 && typeof element.nodeName === `string`
}

export function isFunction(value) {
	return typeof value === `function`
}
