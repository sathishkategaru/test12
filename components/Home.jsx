import React from 'react'
import { Link } from 'react-router'


const Home = () => (
	<div className = "container home">
		<Link to={`/registerclasses`}><div className="options">Register classes</div></Link>
		<Link to={`/registerstudents`}><div className="options">Register students</div></Link>
	</div>
)

export default Home