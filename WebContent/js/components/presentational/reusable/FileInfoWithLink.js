import React from 'react';
import {Link} from 'react-router';

// class FileInfoWithLink extends React.Component {
function FileInfoWithLink(props) {
	return (
		<div className='file-info'>
			<h3><Link to={'/gist/' + props.id}>{props.filename}</Link></h3>
		</div>
	);
}

export default FileInfoWithLink;
