import React from 'react';

import Editor from './Editor';
import FileInfoWithInput from './FileInfoWithInput';


class GistFile extends React.Component {
	render() {
		const {
			editorId,
			filename,
			value,
			isRemovable,
			remove,
			onChange,
		} = this.props;

		return (
			<div className='gist-file'>
				<FileInfoWithInput
					id={editorId}
					filename={filename}
					isRemovable={isRemovable}
					remove={remove}
					onChange={onChange}
				/>

				<Editor editorId={editorId} isReadOnly={false} value={value} />
			</div>
		);
	}
}

export default GistFile;
