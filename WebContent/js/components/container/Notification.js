import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import {closeNotification} from '../../actions/actions';

class Notification extends React.Component {
	componentDidUpdate() {
		$('.notification-time-left').animate({
			width: '100%',
		}, 4000, 'linear', () => this.props.close());
	}

	render() {
		const {isOpen, notificationType, message} = this.props;

		const icon = notificationType === 'success' ?
				'fa fa-check' : 'fa fa-remove';

		return (
			<div>
				{isOpen &&
					<div className={'notification ' + notificationType}>
						<div className='notification-message'>
							<i className={icon} /> <p>{message}</p>
						</div>
						<div className='notification-timer'>
							<div className='notification-time-left'></div>
						</div>
					</div>
				}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		isOpen: state.notifications.isOpen,
		notificationType: state.notifications.notificationType,
		message: state.notifications.message,
	};
}

function mapDispatchToProps(dispatch) {
	return {close: () => dispatch(closeNotification())};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
