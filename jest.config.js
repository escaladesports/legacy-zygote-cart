module.exports = {
	testEnvironment: `jsdom`,
	verbose: true,
	testPathIgnorePatterns: [
		`<rootDir>/node_modules/`,
		`<rootDir>/.cache/`,
		`<rootDir>/public/`,
		`<rootDir>/dist/`,
	],
	testURL: `http://localhost/`,
}