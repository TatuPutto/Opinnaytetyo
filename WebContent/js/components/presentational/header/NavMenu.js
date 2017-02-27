import React from 'react';
import {Link} from 'react-router';


function NavMenu(props) {
	return (
		<div className='nav-menu'>
			<ul>
				<li><Link to='/opinnaytetyo'>Listaa gistit</Link></li>
				<li><Link to='/opinnaytetyo/create'>Luo uusi gist</Link></li>
			</ul>
		</div>
	);
}

export default NavMenu;
