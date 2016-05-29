import React from 'react'
import Marks from './Marks'

const Options = (props) => {
	return (
		<div className = "border tracksheet-container container">
			<div className = "border track-header">
				<div>{props.testName}</div>
				<div>Conducted on: {props.conductedOn}</div>
			</div>			
			<div className = "border subjects">
				{Object.keys(props.marks).map(function(key) {
					return (<Marks key = {key} subject = {key} marks = {props.marks[key]}></Marks>)
				})}
			</div>
		</div>
	)
}

export default Options