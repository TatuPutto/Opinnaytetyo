import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import GistActions from '../presentational/reusable/GistInfo/GistActions';
import GistActionsOwner from
		'../presentational/reusable/GistInfo/GistActionsOwner';

import {
	starGist,
	unstarGist,
	checkIfForked,
	deleteGist,
} from '../../actions/actions';


class GistInfo extends React.Component {
	render() {
		const {
			gist,
			isStarred,
			isStarring,
			toggleStarredStatus,
			forkGist,
			deleteGist,
			userId,
		} = this.props;

		console.log(gist.owner);

			return (
				<div className='gist-info'>
					<span className='owner'>
						<img id='owner-avatar' src={gist.owner.avatar_url} />
						<Link to={'/Opinnaytetyo_spring_react/search/' + gist.owner.login} id='view-gist'>
							{gist.owner.login}
						</Link>
					</span>

					{gist.owner.id === Number(userId) &&
						<GistActionsOwner
							id={gist.id}
							isStarred={isStarred}
							isStarring={isStarring}
							starGist={toggleStarredStatus}
							deleteGist={deleteGist}
						/>
					}

					{gist.owner.id !== Number(userId) &&
						<GistActions
							id={gist.id}
							isStarred={isStarred}
							isStarring={isStarring}
							starGist={toggleStarredStatus}
							forkGist={forkGist}
						/>
					}

				<div className='active-gist-info'>
					<Link to={'/Opinnaytetyo_spring_react/gist/' + gist.id}>
						<h2 className='active-gist-name'>
							{gist.files[0].filename}
						</h2>
					</Link>
					<span style={{background: 'lightblue', marginLeft: '15px', fontSize: '12px', borderRadius: '2px', padding: '0px 2px'}}>
						{gist.public ? 'Julkinen' : 'Salainen'}
					</span>
					<div className='active-gist-description'>
						<p>{gist.description}</p>
					</div>
				</div>
			</div>
		);
	}
}

/*
GistInfo.propTypes = {
	gist: PropTypes.object.isRequired,
	isStarred: PropTypes.bool.isRequired,
	currentUser: PropTypes.string.isRequired,
};*/


function mapStateToProps(state) {
	return {
		gist: state.activeGist.gist,
		isStarred: state.activeGist.isStarred,
		isStarring: state.activeGist.isStarring,
		userId: state.user.id,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleStarredStatus: (isStarred, id) => {
			if(isStarred) {
				dispatch(unstarGist(id));
			} else {
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
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GistInfo);
