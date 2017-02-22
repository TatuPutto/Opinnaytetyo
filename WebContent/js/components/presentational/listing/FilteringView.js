import React from 'react';
import $ from 'jquery';

import Suggestions from './FilteringView/Suggestions';
import {setSuggestions} from '../../../utility/suggestions';


class FilteringView extends React.Component {
	constructor() {
		super();
		this.addFilter = this.addFilter.bind(this);
		this.filterResults = this.filterResults.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.showSuggestions = this.showSuggestions.bind(this);
		this.hideSuggestions = this.hideSuggestions.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
		this.state = {suggestions: [], suggestionsVisible: false, filter: null};

		this.getValueOnEnterPress = this.getValueOnEnterPress.bind(this);
	}

	getValueOnEnterPress(e) {
		const isEnterPressed = e.keyCode === 13;
		const language = e.currentTarget.value;

		if(isEnterPressed && language) {
			this.props.actions.addFilter(language);
			e.currentTarget.value = '';
			this.setState({suggestions: [], suggestionsVisible: false});
		}
	}

	getSuggestions(e) {
		const value = e.target.value;
		const suggestions = setSuggestions(value);
		this.setState({suggestions, suggestionsVisible: true});
	}

	showSuggestions() {
		setTimeout(() => {
			if(this.state.suggestionsVisible) {
				this.setState({suggestionsVisible: false});
			} else {
				this.setState({suggestionsVisible: true});
			}
		}, 200);
	}

	hideSuggestions() {
		this.setState({suggestionsVisible: false});
	}

	filterResults() {
		const language = $('.filter-input').val();

		if(language) {
			this.addFilter(language);
			this.setState({suggestions: [], filter: language});
		}
	}


	autoComplete(e) {
		this.addFilter(e.currentTarget.textContent);
		this.setState({suggestions: []});
	}


	addFilter(language) {
		this.props.actions.addFilter(language);
		$('.filter-input').val('');
	}

	removeFilter() {
		this.setState({filter: null});
		this.props.actions.removeFilter();
	}


	render() {
		return (
			<div className='filtering-view'>
				<input
					type='text'
					className='filter-input'
					placeholder='Ohjelmointikieli'
					onChange={this.getSuggestions}
					onKeyUp={this.getValueOnEnterPress}
				/>

				{/*}<button className='do-filtering' onClick={this.filterResults}>
					<i className='fa fa-filter' />
				</button>*/}

				{this.state.suggestionsVisible && this.state.suggestions.length > 0 &&
					<Suggestions
						suggestions={this.state.suggestions}
						autoComplete={this.autoComplete}
						hideSuggestions={this.hideSuggestions}
					/>
				}
			</div>
		);
	}
}

export default FilteringView;
