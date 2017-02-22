import React from 'react';


class GistActions extends React.Component {
	render() {
		const {
			id,
			// isCheckingStarredStatus,
			isStarred,
			starGist,
			forkGist,
		} = this.props;

		const starredStatus = isStarred ?
				'Poista suosikeista' : 'Lisää suosikkeihin';
		const starIcon = isStarred ? 'fa fa-star-o' : 'fa fa-star';

		return (
			<span className='actions'>
				<button onClick={() => starGist(isStarred, id)}>
					<i className={starIcon}/> {starredStatus}
				</button>

				<button className='fork-gist' onClick={() => forkGist(id)}>
					<i className='fa fa-code-fork'/> Fork
				</button>
			</span>
		);
	}
}


export default GistActions;
