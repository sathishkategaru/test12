import { ADD_TEST, DELETE_TEST, ADD_SUBJECT, SUBJECT_CHANGE, MAX_MARKS_CHANGE, SAVE, 
	RECEIVE_EXAM_DETAILS, POST_EXAM_DETAILS, RECEIVE_POST_EXAM_DETAILS, TEST_STATUS_NEW, TEST_STATUS_UPDATED } from '../actions/index'
import u from 'updeep'

const defaultState = {
	tests: {
		old : [],
		new : []
	},
	isFetching : false
}

const Tests = (state = defaultState, action) => {
	let subjects = [], newState
	switch(action.type) {
		case ADD_TEST:
			const {name, startDate} = action.payload
			for(let i = 0; i < 10; i++) {
				subjects.push({id: i, name: '', maxMarks: 0})
			}
			return {
				tests: {
					new : [{name: name,
					startDate : startDate,
					status : TEST_STATUS_NEW,
					subjects}, ...state.tests.new],
					old : [...state.tests.old]
				}, 
				deletedTests : [...state.deletedTests]
			}

		case DELETE_TEST:
			let isRequestedToDelete = tests => {
				let newTests = tests.slice(0)
				newTests.splice(action.payload.testIndex, 1)
				return newTests
			}
			if (action.payload.testId) {

				let deletedTests = state.deletedTests ? state.deletedTests.slice(0) : []
				deletedTests.push(action.payload.testId)
				return u({ tests: { old : isRequestedToDelete}, deletedTests}, state)
			} else {
				return u({ tests: { new : isRequestedToDelete}}, state)
			}

		case ADD_SUBJECT:
			const {testIndex, testId} = action.payload

			let testsBuf = testId ? state.tests.old : state.tests.new
			let lastUsedSubjectId = 0

			for(let i = 0; i < testsBuf[testIndex].subjects.length; i++) {
				if (lastUsedSubjectId < testsBuf[testIndex].subjects[i].id) {
					lastUsedSubjectId = testsBuf[testIndex].subjects[i].id
				}
			}
			lastUsedSubjectId++

			const addSubject = subjects => [].concat(subjects, [{id : lastUsedSubjectId, name : "", maxMarks : 0}])

			let newTest = u({ subjects: addSubject }, testsBuf[testIndex])

			if (testId) {
				return u({ tests: { old : u.updateIn([testIndex], newTest)}}, state)
			} else {
				return u({ tests: { new : u.updateIn([testIndex], newTest)}}, state)
			}

		case SUBJECT_CHANGE:
			if (action.payload.testId) {
				debugger
				newState = u({ tests: 
					{ old : u.updateIn([action.payload.testIndex, 'subjects', action.payload.subjectIndex, 'name'], 
						action.payload.name)}}, state)
				return u({ tests: 
					{ old : u.updateIn([action.payload.testIndex, "status"], TEST_STATUS_UPDATED)}}, newState)
			} else {
				return u({ tests: { new : u.updateIn([action.payload.testIndex, 'subjects', action.payload.subjectIndex, 'name'], action.payload.name)}}, state)
			}

		case MAX_MARKS_CHANGE:
			if (action.payload.testId) {
				return isNaN(action.payload.maxMarks) ? state : u({ status: TEST_STATUS_UPDATED, tests: { old : u.updateIn([action.payload.testIndex, 'subjects', 
					action.payload.subjectIndex, 'maxMarks'], action.payload.maxMarks)}}, state)
			} else {
				return isNaN(action.payload.maxMarks) ? state : u({ tests: { new : u.updateIn([action.payload.testIndex, 'subjects', 
					action.payload.subjectIndex, 'maxMarks'], action.payload.maxMarks)}}, state)
			}

		case SAVE:
			let tests = state.tests.map(test => {
				subjects = []
				test.subjects.forEach(subject => {
					if (subject.name && subject.name.trim()) {
						subjects.push(Object.assign({}, subject))
					}
				})
				return Object.assign({}, test, {subjects})
			})
			return {tests}

		case RECEIVE_EXAM_DETAILS:
			return {tests: {
				old: action.tests,
				new : []
				}, deletedTests : []
			}

		case RECEIVE_POST_EXAM_DETAILS:
			return {
				tests: {
					new : [],
					old : [...action.tests, ...state.tests.old]
				}, deletedTests : []
			}

		case POST_EXAM_DETAILS:
			return state

		default:
			return {
				tests: {
					old : [],
					new : []
				},
				isFetching : false
			}
	}
}

export default Tests