import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import $ from 'jquery';

import GistList from './GistList';
import Filters from '../../container/Filters';
import ShowActiveGist from '../../container/ShowActiveGist';

import {
	fetchGists,
	fetchSelectedGist,
	fetchSelectedGistPartial,
	receiveSelectedGistInfo,
	fetchSelectedGistFiles,
	refresh,
	sortOldestToNewest,
	sortNewestToOldest,
	addFilter,
	removeFilter
} from '../../../actions/actions';
import {filterByLanguage} from '../../../utility/filterByLanguage';


class ListingPage extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	constructor() {
		super();
		this.moveToEdit = this.moveToEdit.bind(this);
	}

	componentDidMount() {
		$(document.body).on('keydown', this.moveToEdit);
	}


	moveToEdit(e) {
		const router = this.context.router;
		const gistId = this.props.activeGist.gistId;
		const gists = this.props.gists.items;
/*
 		if(e.shiftKey && e.keyCode === 69) {
			router.push('/opinnaytetyo/edit/' + gistId);
		} else if(e.shiftKey && e.keyCode === 83){
			router.push('/opinnaytetyo/gist/' + gistId);
		} else if(e.shiftKey && e.keyCode === 72){
			router.push('/opinnaytetyo');
		} else if(e.keyCode === 38) {
			let activeGistIndex;

			for(let i = 0; i < gists.length; i++) {
				if(gists[i].id === gistId) {
					activeGistIndex = i;
					break;
				}
			}
			if(activeGistIndex > 0) {
				this.props.gistActions.setActive(gists[activeGistIndex - 1].id);
			}

		} else if(e.keyCode === 40){
			let activeGistIndex;

			for(let i = 0; i < gists.length; i++) {
				if(gists[i].id === gistId) {
					activeGistIndex = i;
					break;
				}
			}

			if(activeGistIndex < gists.length - 1) {
				this.props.gistActions.setActive(gists[activeGistIndex + 1].id);
			}

		}*/


	}

	render() {
		return (
			<div className='listing'>
				<div className='content-left'>
					<Filters
						fetchMethod={this.props.gists.fetchMethod}
						filters={this.props.filters}
						filteringActions={this.props.filteringActions}
					/>

					<GistList
						gists={this.props.gists}
						activeGistId={this.props.activeGist.id}
						pagination={this.props.pagination}
						setActive={this.props.gistActions.setActive}
						addFilter={this.props.filteringActions.addFilter}
					/>
				</div>

				<div className='content-right'>
					<ShowActiveGist	/>
				</div>
			</div>
		);
	}
}

let activeId;
let fetchParams;
//Luetaan listausnäkymän tarvitsema tiladata
//ja määritellään miten data muutetaan attribuuttidataksi.
function mapStateToProps(state) {
	activeId = state.activeGist.id;
	fetchParams = {
		method: state.gists.fetchMethod,
		page: state.pagination.currentPage
	};


	return {
		gists: {
			...state.gists,
			items: filterByLanguage(state.filters.languages, state.gists.items)
		},
		activeGist: state.activeGist,
		filters: state.filters,
		pagination: state.pagination,
		userId: state.user.id
	};
}



//Määritellään listausnäkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
		//Suodatustoiminnot.
		filteringActions: {
		 	addFilter: (language) => dispatch(addFilter(language)),
		 	removeFilter: (language) => dispatch(removeFilter(language)),
		 	refresh: () => dispatch(refresh(fetchParams.method, fetchParams.page))
		},

		//Aktiivisen gistin toiminnot.
		gistActions: {
			setActive: (id, gist) => {
				if(id !== activeId) {

					//dispatch(fetchSelectedGistPartial(gist));
					//dispatch(receiveSelectedGistInfo(gist));
					//dispatch(fetchSelectedGistFiles(id));
					dispatch(fetchSelectedGist(id));
				}
			},
			forkGist: (id) => dispatch(checkIfForked(id)),
			toggleStarredStatus: (isStarred, id) => {
				if(isStarred) {
					dispatch(unstarGist(id));
				}
				else {
					dispatch(starGist(id));
				}
			},
			deleteGist: (id) => {
				if(confirm('Haluatko varmasti poistaa tämän gistin?')) {
					dispatch(deleteGist(id));
				}
			}
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
