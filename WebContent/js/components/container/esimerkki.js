import Rea from 'react-dom';
import React from 'react';




class NavMenu extends React.Component {
	render() {
		return (
			<ul className='nav-menu'>
				<li><Link to='/'>Listaa gistit</Link></li>
				<li><Link to='/create'>Luo uusi gist</Link></li>
			</ul>
		);
	}
}

class UserInfo extends React.Component {
	render() {
		return (
			<div className='user-info'>
				<img src={this.props.avatarUrl}>
				<p>{this.props.username}</p>
			</div>
		);
	}
}

//Header renderöi lapsikomponenttinsa UserInfo ja NavMenu.
class Header extends React.Component {
	render() {
		return (
			<UserInfo
				username={'TatuPutto'}
				avatarUrl={'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40'}
			/>
			<NavMenu />
		);
	}
}

//Renderöidään Header-komponentti DOM-solmuun.
ReactDOM.render(<Header />, document.getElementById('container'));
