import React from 'react'
import AddTest from './addTest'
import Test from './Test'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { fetchExamDetails } from '../actions/index'

class Track extends React.Component {
	componentWillMount() {
		const {dispatch} = this.props
		dispatch(fetchExamDetails())
	}
	render() {
		const {newTests, oldTests} = this.props
		return ( <MuiThemeProvider muiTheme={getMuiTheme()}>
			<div className="container content">
				<AddTest />
				{newTests.length ? <div>New Exams<hr /></div> : ''}
				<div className="border new-tests-container">
					{newTests.map(function(test, index) {
						return <Test key = {index} {...test} testIndex = {index} editable="true"></Test>	
					})}
				</div>
				{newTests.length ? <div>Existing Exams<hr /></div> : ''}
				<div className="border tests-container">
					{oldTests.map(function(test, index) {
						return <Test key = {index} {...test} testIndex = {index} editable="true"></Test>	
					})}
				</div>
			</div>
		</MuiThemeProvider> )
	}
}

export default Track = connect((store, dispatch) => {
	return {
		newTests: store.tests.tests.new,
		oldTests: store.tests.tests.old,
		dispatch
	}
})(Track)