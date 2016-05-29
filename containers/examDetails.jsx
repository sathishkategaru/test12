import React from 'react';
import { connect } from 'react-redux';
import Track from '../components/Track'
import { fetchExamDetails, postExamDetails, save, deleteTest, addSubject, subjectChange, maxMarksChange } from '../actions/index'

const mapStateToTrackProps = (state) => {
	return {
		tests : state.tests.tests
	}
}

const mapDispatchToTrackProps = (dispatch) => {
	return {
		onClickAddSubject : (testIndex) => {dispatch(addSubject(testIndex))},
		onClickDeleteTest : (index) => {dispatch(deleteTest(index))},
		onSave : (tests) => {dispatch(postExamDetails(tests))},
		fetchExams : () => {dispatch(fetchExamDetails())}
	}
}

const ExamDetails = connect(mapStateToTrackProps, mapDispatchToTrackProps)(Track);

export default ExamDetails