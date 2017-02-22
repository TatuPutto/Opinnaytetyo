import React from 'react';
import {Link} from 'react-router';


function NavMenu(props) {
	return (
		<div className='nav-menu'>
			<ul>
				<li><Link to='/Opinnaytetyo_spring_react'>Listaa gistit</Link></li>
				<li><Link to='/Opinnaytetyo_spring_react/create'>Luo uusi gist</Link></li>
			</ul>
		</div>
	);
}

export default NavMenu;
