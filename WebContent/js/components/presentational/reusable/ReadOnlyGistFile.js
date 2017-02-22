import React from 'react';
import {Link} from 'react-router';
import clipboard from 'clipboard-js';

import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	constructor() {
		super();
		this.copySource = this.copySource.bind(this);
	}

	copySource() {
		clipboard.copy(this.props.value);
	}

	render() {
		const {
			editorId,
			filename,
			value,
		} = this.props;

		return (
			<div className='gist-file'>
				<div className='file-info'>
					<h3>{filename}</h3>
					<button className='copy-source'>
						<i className='fa fa-copy' />
					</button>
				</div>

				<Editor editorId={editorId} isReadOnly={true} value={value} />
			</div>
		);
	}
}

export default ReadOnlyGistFile;
