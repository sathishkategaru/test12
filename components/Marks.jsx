import React from 'react'

const Marks = (props) => {
	return (
		<div className = "border marks">
			<div>{props.subject}</div>
			<div>{props.marks}</div>
		</div>
	)
}

export default Marks