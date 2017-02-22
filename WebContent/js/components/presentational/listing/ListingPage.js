import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import GistList from './GistList';
import Filters from '../../container/Filters';
import ShowActiveGist from '../../container/ShowActiveGist';

import {
	fetchGists,
	fetchSelectedGist,
	fetchSelectedGistFiles,
	refresh,
	sortOldestToNewest,
	sortNewestToOldest,
	addFilter,
	removeFilter
} from '../../../actions/actions';
import {filterByLanguage} from '../../../utility/filterByLanguage';


class ListingPage extends React.Component {
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
						activeGistId={this.props.activeGist.gistId}
						pagination={this.props.pagination}
						setActive={this.props.gistActions.setActive}
					/>
				</div>

				<div className='content-right'>
					<ShowActiveGist
						gist={this.props.activeGist}
						gistActions={this.props.gistActions}
						isFetchingGists={this.props.gists.isFetching}
						userId={this.props.userId}
					/>
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
	activeId = state.activeGist.gistId;
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
			setActive: (id) => {
				if(id !== activeId) {
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
			},
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
