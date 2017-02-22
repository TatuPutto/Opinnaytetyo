import React from 'react';


class FileInfoWithInput extends React.Component {
	render() {
		const {
			id,
			filename,
			isRemovable,
			remove,
			onChange,
		} = this.props;

		let filenameField;
		if(filename) {
			filenameField = <input
				type='text'
				className='filename'
				placeholder='tiedostonimi esim. index.html'
				defaultValue={filename}
				onChange={onChange}
			/>;
		} else {
			filenameField = <input
				type='text'
				className='filename'
				placeholder='tiedostonimi esim. index.html'
				onChange={onChange}
			/>;
		}

		return (
			<div className='file-info'>
				{filenameField}

				{isRemovable &&
					<button className='remove-file' onClick={() => remove(id)}>
						<i className='fa fa-trash'></i> Poista
					</button>
				}
			</div>
		);
	}
}

export default FileInfoWithInput;
