import React from 'react';
const ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/eclipse');

class Editor extends React.Component {
	// Muodostetaan editori <div>-elementtiin,
	// mikäli komponentti liitettiin onnistuneesti DOM:iin.
	componentDidMount() {
		const {editorId, value, isReadOnly} = this.props;

		const editor = ace.edit(editorId);
		editor.$blockScrolling = Infinity;
		editor.setTheme('ace/theme/eclipse');
		editor.getSession().setMode('ace/mode/javascript');
		editor.getSession().setUseWorker(false);
		editor.setShowPrintMargin(false);
		editor.setReadOnly(isReadOnly);
		editor.setOptions({fontSize: '14px'});



		if(value) {
			const lines = value.split('\n').length + 1;
			if(value.endsWith('\n')) {
				editor.setValue(value);
			}
			else {
				editor.setValue(value + '\n');
			}


			if(isReadOnly) {
				editor.setOptions({maxLines: lines});
			} else {
				editor.setOptions({minLines: 10, maxLines: 9999});
			}
			editor.selection.moveTo(0);
		} else {
			editor.setOptions({minLines: 10, maxLines: 9999});
		}
	}


	render() {
		return <div id={this.props.editorId}></div>;
	}
}

export default Editor;
