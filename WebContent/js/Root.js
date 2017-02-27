import React from 'react';
import {connect} from 'react-redux';

import Header from './components/container/Header';
import Notifications from './components/container/Notification';


function Root(props) {
	return (
		<div className='content'>
			<Header />
			<Notifications />
			{props.children}
		</div>
	);
}

export default Root;
