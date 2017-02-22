import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';


class ShowActiveGist extends React.Component {

	static propTypes = {
		gist: PropTypes.object.isRequired,
		isFetchingGists: PropTypes.bool.isRequired,
		//isFetchingSelectedGist: PropTypes.bool.isRequired
	};


	render() {
		const {isFetching, gist} = this.props.gist;
		const isFetchingGists = this.props.isFetchingGists;

		if(!isFetchingGists && isFetching) {
			return <div className='loading'></div>;
		}
		//Jos lista ja aktiivinen gist on ladattu renderöidään aktiivinen gist
		else if(!isFetchingGists && !isFetching && gist.hasOwnProperty('id')) {

			//Käydään gistin sisältämät tiedostot läpi ja luodaan jokaista
			//tiedostoa kohden yksi ilmentymä ReadOnlyGistFile-komponentista.
			const files = gist.files.map((file, index) => {
				return (
					<ReadOnlyGistFile
						key={file.filename}
						id={gist.id}
						filename={file.filename}
						value={file.content}
						editorId={'editor' + index}
						isReadOnly={true}
					/>
				);
			});
		
			//Renderöidään inforuutu ja tiedostokentät.
			return (
				<div className='show-active-gist'>
					<GistInfo
						gist={this.props.gist}
						userId={this.props.userId}
						gistActions={this.props.gistActions}
					/>


					<div className='gist-files'>
						{files}
					</div>
				</div>
	   	 	);

		}
		else {
			return <div></div>;
		}
	}

}

/*
function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isFetchingGists: state.gists.isFetching,
		isFetchingSelectedGist: state.activeGist.isFetching,
	}
}*/

//export default connect(mapStateToProps)(ShowActiveGist);

export default ShowActiveGist;
