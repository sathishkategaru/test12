import { combineReducers } from 'redux'
import Tests from './track'

const rootReducer = combineReducers({
	tests: Tests
})

export default rootReducer