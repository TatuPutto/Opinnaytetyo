import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';


import UserInfo from '../presentational/header/UserInfo';
import NavMenu from '../presentational/header/NavMenu';
import SearchBar from '../presentational/header/SearchBar';

import {fetchGists} from '../../actions/actions';

class Header extends React.Component {
	render() {
		return (
			<div className='header'>
				<img className='logo' src="http://placehold.it/150x50" />
				<SearchBar search={this.props.search} />
				<NavMenu />
				<UserInfo
					id={this.props.id}
					userLogin={this.props.userLogin}
					avatarUrl={this.props.avatarUrl}
				/>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		id: state.user.id,
		userLogin: state.user.userLogin,
		avatarUrl: state.user.avatarUrl,
	};
}


function mapDispatchToProps(dispatch) {
	return {
		login: () => {
			dispatch(login());
		},
		search: (user) => {
			console.log(user);
			dispatch(fetchGists('search', null, user));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
