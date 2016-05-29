import React from 'react'
import { Link } from 'react-router'


const Header = (props) => {
	console.log('header')
	return (
		<div>
			<div className = "header">
				<ul className= "container">
			    	<li><Link to={`/home`} activeClassName="active"><div>Home</div></Link></li>
			    	<li><Link to={`/track`} activeClassName="active"><div>Track</div></Link></li>
			    	<li><Link to={`/attendance`} activeClassName="active"><div>Attendance</div></Link></li>
			    	<li><Link to={`/timetable`} activeClassName="active"><div>Time Table</div></Link></li>
			    	<li><Link to={`/notifications`} activeClassName="active"><div>Notifications</div></Link></li>
			    	<li><Link to={`/fees`} activeClassName="active"><div>Fees</div></Link></li>
		    	</ul>
	    	</div>
			{props.children}
		</div>
	)
}

export default Header