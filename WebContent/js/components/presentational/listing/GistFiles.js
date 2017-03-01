import React from 'react';

import ReadOnlyGistFile from '../reusable/ReadOnlyGistFile';

function GistFiles(props) {
    return (
        <div className='gist-files'>
            {props.files.map((file, i) =>
                <ReadOnlyGistFile
                    key={file.filename}
                    filename={file.filename}
                    value={file.content}
                    editorId={`editor${i}`}
                    isReadOnly={true}
                />
            )}
        </div>
    );
}

export default GistFiles;
