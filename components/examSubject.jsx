import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subjectChange, maxMarksChange } from '../actions/index'

class Subject extends Component {
	render() {
		const {dispatch, testId, testIndex, subjectIndex, testStatus, name, maxMarks} = this.props
		return (
			<div className = "subjects-container">
				<input onChange={(e) => dispatch(subjectChange(testIndex, testId, subjectIndex, e.target.value))} value = {name}></input>
				<input onChange={(e) => dispatch(maxMarksChange(testIndex, testId, subjectIndex, e.target.value))} value = {maxMarks}></input>
			</div>
		)
	}
}

export default Subject = connect()(Subject)