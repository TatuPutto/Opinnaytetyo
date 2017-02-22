import React from 'react';

class Filters extends React.Component {
	constructor() {
		super();
		this.toggleFilteringOptions = this.toggleFilteringOptions.bind(this);

		//Alustetaan komponentin tila.
		this.state = {isOpen: false};
	}

	//Muutetaan komponentin tilaa.
	toggleFilteringOptions() {
		this.setState({isOpen: !this.state.isOpen});
	}

	render() {
		//Määritellään painikkeen arvo isOpen-muuttujan arvon perusteella.
		const buttonText = this.state.isOpen ? 'Piilota suodattimet' : 'Näytä suodattimet';

		return (
			<div className='filters'>
				<button onClick={this.toggleFilteringOptions}>{buttonText}</button>

				{/*Mallinnetaan suodatustoiminnot, jos isOpen === true*/}
				{this.state.isOpen &&
					<FilteringOptions />
				}
			</div>
		);
	}
}


export default Asdf;




class UserInfo extends React.Component {
	render() {
		return (
			React.createElement('div', {className: 'user-info'},
				React.createElement('img', {src: this.props.avatarUrl}),
				React.createElement('p', {}, this.props.username),
			)
		);
	}
}

//UserInfo-komponentti renderoidaan yliluokassa esimerkiksi näin:
React.createElement(UserInfo, {avatarUrl: 'https://...', username: 'TatuPutto'})
