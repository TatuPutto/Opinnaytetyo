import React from 'react';
import {Link} from 'react-router';
import clipboard from 'clipboard-js';

import Editor from './Editor';
import FileInfoWithLink from './FileInfoWithLink';


class ReadOnlyGistFile extends React.Component {

	constructor() {
		super();
		this.showAllLines = this.showAllLines.bind(this);
		this.copySource = this.copySource.bind(this);
		this.minimizeEditor = this.minimizeEditor.bind(this);
		this.state = {
			isMinimized: false,
			originalValue: null,
			shortenedValue: null,
			lines: null
		};
	}

	componentWillMount() {
		let lines = this.props.value.split('\n');
		let shortenedValue = '';
		let isValueShortened = false;

		if(lines.length > 500) {
			isValueShortened = true;
			for(let i = 0; i < 500; i++) {
				shortenedValue += lines[i] + '\n';
			}
		}

		this.setState({
			originalValue: this.props.value,
			shortenedValue,
			isValueShortened,
			lines: lines.length,
		});
	}

	showAllLines(editorId) {
		const editor = ace.edit(editorId);
		editor.setValue(this.state.originalValue);
		editor.setOptions({maxLines: this.state.lines + 1});
		editor.selection.moveTo(500);

		this.setState({isValueShortened: false});
	}

	copySource() {
		clipboard.copy(this.state.originalValue);
	}

	minimizeEditor() {
		if(this.state.isMinimized) {
			this.setState({isMinimized: false});
		} else {
			this.setState({isMinimized: true});
		}
	}

	render() {
		const {
			editorId,
			filename,
		} = this.props;

		const {
			shortenedValue,
			originalValue,
			isValueShortened,
			isMinimized
		} = this.state;

		const value = isValueShortened ? shortenedValue : originalValue;

		return (
			<div className='gist-file'>
				<div className='file-info'>
					<h3>{filename}</h3>
					<button className='minimize-editor' onClick={this.minimizeEditor}>
						<i className={isMinimized ?
								'fa fa-window-maximize' : 'fa fa-window-minimize'} /> &nbsp;
					</button>
					<button className='copy-source' onClick={this.copySource}>
						<i className='fa fa-copy' />
					</button>
				</div>

				{!isMinimized &&
					<Editor
						editorId={editorId}
						value={value}
						isReadOnly={true}
					/>
				}

				{isValueShortened &&
					<p className='show-all-lines'
							onClick={() => this.showAllLines(editorId)}>
						Näytä koko koodileike ({this.state.lines} riviä)
					</p>
				}
			</div>
		);
	}
}

export default ReadOnlyGistFile;
