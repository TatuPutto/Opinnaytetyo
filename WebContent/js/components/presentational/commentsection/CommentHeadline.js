import React, {PropTypes} from 'react';


class CommentHeadline extends React.Component {
    render() {
        return (
            <div className='comment-headline'>
                <img src={this.props.commenterAvatarUrl} />
                <p>{this.props.commenter}</p>
            </div>
        );
    }
}

export default CommentHeadline;
