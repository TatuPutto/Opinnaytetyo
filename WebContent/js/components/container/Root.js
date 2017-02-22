import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Notifications from './Notification';


class Root extends React.Component {
	render() {
		return (
			<div className='content'>
				<Header />
				<Notifications />
				{this.props.children}
			</div>
		);
	}
}

export default Root;
