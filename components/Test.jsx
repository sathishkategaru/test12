import React , { Component } from 'react'
import Subject from './examSubject'
import { connect } from 'react-redux'
import { addSubject, deleteTest } from '../actions/index'

let Test = (props) => {
	const {dispatch, status, testIndex, name, editable} = props
	return (
		<div className = "border test-container">

			{editable ? <div style = {{width: 300, marginTop: 20}}>
			<div style = {{float: "right", cursor: "pointer"}} 
			onClick = {() => dispatch(deleteTest(testIndex, props.id))}>Delete</div></div> : ''}

			<div className = "border test">
				<div className = "test-name">{name}</div>
				<div className = "test-header">
					<div>Subject</div>
					<div>Max Marks</div>
				</div>

				<div className = "subject-add-btn" 
				onClick={() => dispatch(addSubject(testIndex, props.id))}>Add Subject</div>

				{props.subjects.map((sub, index) => 
					<Subject key = {sub.id} {...sub} testStatus = {status} testId = {props.id} testIndex = {testIndex} 
					subjectIndex = {index}></Subject>)
				}
			</div>
		</div>
	)
}

export default Test = connect()(Test)