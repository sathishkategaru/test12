import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import { addTest, postExamDetails } from '../actions/index'

class AddTest extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {testName: '', startDate : null, disable: true};
	}
	handleTestNameChange(e) {
		let allTests = [...this.props.tests.tests.new, ...this.props.tests.tests.old], 
			disable = !e.target.value.trim(), error = false
		for(let i = 0; i < allTests.length; i++) {
			if (allTests[i].name === e.target.value) {
				disable = true
				error = true
				break
			}
		}
		this.setState({testName: e.target.value, startDate : this.state.startDate, disable, error})
	}
	handleStartDateChange(x, e) {
		this.setState({testName: this.state.testName, startDate : e.toLocaleDateString()})
	}
	onClickAddTest() {
		const {dispatch} = this.props
		const {testName, startDate} = this.state
		dispatch(addTest(testName, startDate))
		this.setState({testName: '', startDate : null, disable: true})
	}	
	render() {
		const { testName } = this.state
		const { tests, dispatch } = this.props
		return (
			<div>
				<div className ="add-test-container">
					<TextField className = "new-test-name" hintText = "Enter exam name here" 
					onChange={this.handleTestNameChange.bind(this)} value = {testName} />
					
					<DatePicker id="examStartDate" className = "exam-start-date" mode = "landscape" 
					hintText = "Exam Start Date(optional)" onChange={this.handleStartDateChange.bind(this)} /> 

					<button className="add-new-test-btn" onClick = {this.onClickAddTest.bind(this)} 
					disabled = {this.state.disable}>
						Add
					</button>

					<button className="save-btn" onClick = {() => dispatch(postExamDetails(tests))}>
						Save
					</button>
				</div>
				<div className ="add-test-container">
					{this.state.error ? <span style={{color: "red"}}>{this.state.testName} already exists</span> : ""}
				</div>
			</div>
		)
	}
}


export default AddTest = connect((store, dispatch) => {
	return {
		tests: store.tests,
		dispatch
	}
})(AddTest)
