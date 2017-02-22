import React, {PropTypes} from 'react';
import CommentHeadline from './CommentHeadline';
import CommentBody from './CommentBody';

class Comments extends React.Component {
    render() {

        const {comments} = this.props.comments;
        console.log(comments);
        const commentContainers = this.props.comments.map((comment) => {
            console.log(comment);
            return (
                <div className='comment-container' key={comment.body}>
                    <CommentHeadline
                        commenterAvatarUrl={comment.commenterAvatarUrl}
                        commenter={comment.commenter}
                    />
                    <CommentBody comment={comment.body} />
                </div>
            );
        });



        console.log(commentContainers);

        return (
            <div className='comment-section'>

                    {commentContainers}

            </div>
        );
    }
}


export default Comments;
