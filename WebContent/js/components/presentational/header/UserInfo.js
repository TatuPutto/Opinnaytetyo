import React from 'react';
import {Link} from 'react-router';

import UserInfoDropdown from './UserInfo/UserInfoDropdown';

class UserInfo extends React.Component {
	constructor() {
		super();
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.state = {isDropdownOpen: false};
	}

	toggleDropdown() {
		if(this.state.isDropdownOpen) {
			this.setState({isDropdownOpen: false});
		} else {
			this.setState({isDropdownOpen: true});
		}
	}

	render() {
		return (
			<div className='user-info'>
				<div className='user-info-details' onClick={this.toggleDropdown}>
					<img className='user-avatar' src={this.props.avatarUrl} />
					<p>{this.props.userLogin}</p>
					<a href="/opinnaytetyo/logout">Kirjaudu ulos</a>
					{/*}<i className='fa fa-sort-down' />*/}
				</div>
				{/*
				<div>
					{this.state.isDropdownOpen &&
						<UserInfoDropdown
							{...this.props}
							closeDropdown={this.toggleDropdown}
						/>
					}
				</div>
				*/}
			</div>
		);
	}
}


export default UserInfo;
