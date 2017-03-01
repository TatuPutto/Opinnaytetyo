import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

import GistListItem from './GistListItem';
import PaginationLinks from './PaginationLinks';
import {fetchSelectedGist, fetchMoreGists} from '../../../actions/actions';

import {filterByLanguage} from '../../../utility/filterByLanguage';
//Ladataan värikoodit ohjelmointikielille
const colors = require("../../../../static/colors.json");

class GistList extends React.Component {
/*
	static propTypes = {
		gists: PropTypes.array.isRequired,
		activeGistId: PropTypes.string.isRequired,
		isFetching: PropTypes.bool.isRequired,
		setActive: PropTypes.func.isRequired
	};
*/
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};


	constructor() {
		super();
		//this.setActive = this.setActive.bind(this);
		this.getColorCode = this.getColorCode.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		//Scrollataan listan alkuun discover-toiminnallisuudessa sivua vaihdettaessa.
		if(nextProps.currentPage !== this.props.currentPage) {
			//ReactDOM.findDOMNode(this.refs.gistlist).scrollTop = 0;
		}
			//	&& nextProps.gists.items.length > 0) {

		if(nextProps.gists.items.length > 0) {
			if(this.props.activeGistId !== nextProps.activeGistId) {
				if(this.props.activeGistId !== nextProps.activeGistId) {
				}
			}
		}





	//	if(nextProps.gists.items.length > 0 && nextProps.gists.items[0] )*/
	}

	/**
	 * Haetaan kielelle määrietty värikoodi
	 */
	getColorCode(language) {
		let colorCode;
		try {
			colorCode = colors[language].color;
		} catch(error) {
			colorCode = '#D0D0D0';
		}
		return colorCode;
	}




	render() {
		/*const { gists, fetchMethod, isFetching, activeGistId, setActive,
				fetchMore, currentPage, nextPage, previousPage, lastPage } = this.props;*/

		const {
			items: gists,
			fetchMethod,
			fetchError,
			isFetching,
		} = this.props.gists;
		const {
			currentPage,
			nextPage,
			previousPage,
			lastPage,
		} = this.props.pagination;


		//luodaan jokaista taulukon sisältämää gistiä kohden yksi ilmentymä GistListItem-komponentti.
		const listItems = gists.map((gist) => {
			return (
				<GistListItem
					gist={gist}
					key={gist.id}
					id={gist.id}
					filename={gist.files[0].filename}
					description={gist.description}
					fileCount={gist.files.length}
					commentsAmount={gist.commentsAmount}
					language={gist.files[0].language}
					color={this.getColorCode(gist.files[0].language)}
					createdAt={gist.createdAt}
					owner={gist.owner.login}
					ownerAvatar={gist.owner.avatarUrl}
					activeGistId={this.props.activeGistId}
					setActive={this.props.setActive}
					addFilter={this.props.addFilter}
				/>
			);
		}, this);

		//Renderöidään lista ja asetetaan GistListItem-komponentista luodut ilmentymät listan sisällöksi.
		return (
			<div className='gist-list' ref='gistlist'>
				{fetchError &&
					<p>Gistien hakemisessa tapahtui virhe. {fetchError}</p>
				}
				{isFetching && !fetchError &&
					<div className='loading'></div>
				}
				{!isFetching && listItems.length === 0 && !fetchError &&
					<p>Hakuehtoja vastaavia gistejä ei löytynyt.</p>
				}

				{listItems.length > 0 && !fetchError && !isFetching &&
					<ul>
						{listItems}
					</ul>
				}

				{fetchMethod === 'discover' &&
					<PaginationLinks
						currentPage={currentPage}
						nextPage={nextPage}
						previousPage={previousPage}
						lastPage={lastPage}
					/>
				}
			</div>
		);
	}

}




let activeId;
function mapStateToProps(state) {
	activeId = state.activeGist.id;

	return {
		//gists: filterByLanguage(state.filters.language, state.gists.items),
		activeGistId: state.activeGist.id,
		//isFetching: state.gists.isFetching,
		//fetchMethod: state.gists.fetchMethod,
		currentPage: state.pagination.currentPage,
		nextPage: state.pagination.nextPage,
		previousPage: state.pagination.previousPage,
		lastPage: state.pagination.lastPage,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		/*setActive: (id) => {
			if(id !== activeId) {
				dispatch(fetchSelectedGist(id));
			}
		},
		fetchMore: (pageNum) => {
			dispatch(fetchMoreGists(pageNum));
		}*/
	};
}

//export default GistList;
export default connect(mapStateToProps, mapDispatchToProps)(GistList);
