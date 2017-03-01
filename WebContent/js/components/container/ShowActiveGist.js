import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import GistFiles from '../presentational/listing/GistFiles';

class ShowActiveGist extends React.Component {
	render() {
		const isListLoading = this.props.isListLoading;
		const {
			id,
			files,
			isFetching,
			isFetchingFiles,
			fetchError,
		} = this.props.gist;


		if(!isListLoading && isFetching && !fetchError) {
			return <div className='loading'></div>;
		} else if(!isListLoading && !isFetching && id !== null && !fetchError) {
			//Renderöidään inforuutu ja tiedostokentät.
			return (
				<div className='show-active-gist'>
					<GistInfo />
					{!isFetchingFiles &&
						<GistFiles files={files} />
					}
					{isFetchingFiles &&
						<div className='loading-files'></div>
					}
				</div>
	   	 	);
		} else {
			return <div></div>;
		}
	}
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist,
		isListLoading: state.gists.isFetching,

	}
}

export default connect(mapStateToProps)(ShowActiveGist);
