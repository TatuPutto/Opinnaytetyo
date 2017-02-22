import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';


class UserInfoDropdown extends React.Component {

	componentDidMount() {
		// Suljetaan dropdown, jos klikataan komponentin ulkopuolelle.
		$(document).on('click', () => this.props.closeDropdown());
	}

	componentWillUnmount() {
		// Poistetaan kuuntelija, kun komponentti irrotetaan DOM:sta.
		$(document).off('click');
	}

	render() {
		return (
			<div className='user-info-dropdown'>
				<div className='user-info-dropdown-avatar'>
					<img className='user-avatar-large' src={this.props.avatarUrl} />
				</div>
				<div className='user-info-dropdown-details'>
					<ul>
						<li>{this.props.userLogin}</li>
						<li>{this.props.id}</li>
					</ul>
				</div>
				<div className='user-info-dropdown-logout'>
					<Link to={'/logout'}>
						<button>Kirjaudu ulos</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default UserInfoDropdown;
