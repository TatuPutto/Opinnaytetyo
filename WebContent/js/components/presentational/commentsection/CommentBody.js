import React, {PropTypes} from 'react';


class CommentBody extends React.Component {
    render() {
        console.log(this.props.comment);

        return (
            <div className='comment-body'>
                <p>{this.props.comment}</p>
            </div>
        );
    }
}

export default CommentBody;
