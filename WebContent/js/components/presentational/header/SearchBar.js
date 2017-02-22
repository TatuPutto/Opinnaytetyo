import React from 'react';
import {Link} from 'react-router';

class SearchBar extends React.Component {
	constructor() {
		super();
		this.getInput = this.getInput.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.state = {input: ''};
	}

	getInput(e) {
		this.setState({input: e.target.value});
	}

	doSearch() {
		this.props.search(this.state.input);
	}

	render() {
		return (
			<div className='search'>
				<input
					type='text'
					className='search-input'
					placeholder='Haku'
					onChange={this.getInput}
				/>

				<Link to={'/Opinnaytetyo_spring_react/search/' + this.state.input}>
					<button className='do-search'>
						<i class="fa fa-search" />
					</button>
				</Link>
			</div>
		);
	}
}

export default SearchBar;
