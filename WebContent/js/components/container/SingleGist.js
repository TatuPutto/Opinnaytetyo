import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import GistInfo from './GistInfo';
import ReadOnlyGistFile from '../presentational/reusable/ReadOnlyGistFile';
import Comments from '../presentational/commentsection/Comments';

import {
	fetchUserInfo,
	fetchGists,
	fetchSelectedGist,
	fetchComments
} from '../../actions/actions';


class SingleGist extends React.Component {
	static propTypes = {
		gist: PropTypes.object.isRequired,
		isFetchingSelectedGist: PropTypes.bool.isRequired
	};


	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if(nextProps.gist.hasOwnProperty('comments')) {
			if(nextProps.gist.comments > 0 && this.props.comments.length === 0) {
				this.props.fetchComments(nextProps.gist.id);
			}
		}
	}


	render() {
		const {isFetching, gist, comments} = this.props;

		console.log(comments);
		if(isFetching || !gist.hasOwnProperty('id')) {
			return <div className='loading'></div>;
		} else {
			const files = gist.files.map((file, i) => {
				return (
					<ReadOnlyGistFile
						key={file.filename}
						filename={file.filename}
						value={file.content}
						editorId={'editor' + i}
						isReadOnly={true}
					/>
				);
			});

			return (
				<div className='single'>
					<div className='show-active-gist'>
						<GistInfo />
						<div className='gist-files'>
							{files}
						</div>
						<div className='gist-comments'>
							{comments.length === 0 &&
								<p>Ei kommentteja</p>
							}
							{comments.length > 0 &&
								<Comments comments={comments} />
							}
						</div>
					</div>
				</div>
	   	 	);
		}
	}
}


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		comments: state.activeGist.comments,
		isFetching: state.activeGist.isFetching
	};
}

//Määritellään yksittäisen gistin näkymän toiminnot.
function mapDispatchToProps(dispatch) {
	return {
		fetchComments: (id) => dispatch(fetchComments(id)),
		toggleStarredStatus: (isStarred, id) => {
			if(isStarred) {
				dispatch(unstarGist(id));
			}
			else {
				dispatch(starGist(id));
			}
		},
		forkGist: (id) => {
			dispatch(checkIfForked(id));
		},
		deleteGist: (id) => {
			if (confirm('Haluatko varmasti poistaa tämän gistin?')) {
				dispatch(deleteGist(id));
			}
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleGist);
