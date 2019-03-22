import validateAllInput from './validate-all-input'
import errorCheck from './error-check'
import nextStep from './next-step'

export default function attemptSubmitInfo() {
	validateAllInput(`info`)
	setTimeout(() => {
		if (errorCheck()) return
		nextStep()
	}, 1)
}