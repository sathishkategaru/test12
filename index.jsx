import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Header from './components/Header'
import Home from './components/Home'
import Track from './components/Track'
import Attendance from './components/Attendance'
import TimeTable from './components/TimeTable'
import Notifications from './components/Notifications'
import Fees from './components/Fees'
import Registerclasses from './components/Registerclasses'
import Registerstudents from './components/Registerstudents'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore'
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

require('./styles/main.css')
require('./styles/home.css')
require('./styles/track.css')


const store = configureStore()

render(
  <Provider store={store}>
  	<Router history={hashHistory}>
  		<Route path = '/' component = {Header}>
	  		<IndexRoute component = {Home}></IndexRoute>
	  		<Route path="/home" component= {Home}></Route>
	  		<Route path = "/track" component={Track}></Route>
	  		<Route path = "/attendance" component={Attendance}></Route>
	  		<Route path = "/timetable" component={TimeTable}></Route>
	  		<Route path = "/notifications" component={Notifications}></Route>
	  		<Route path = "/fees" component={Fees}></Route>
	  		<Route path = "/registerclasses" component={Registerclasses}></Route>
	  		<Route path = "/registerstudents" component={Registerstudents}></Route>
	    </Route>
  	</Router>
  </Provider>,
  document.getElementById('root')
)

