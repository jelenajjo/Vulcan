import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withList, withCurrentUser, Components, registerComponent, Utils, replaceComponent } from 'meteor/vulcan:core';
import Comments from 'meteor/vulcan:comments';

const CustomPostsCommentsThread = (props, context) => {

  const {loading, terms: { postId }, results, totalCount} = props;

  if (loading) {

    return <div className="posts-comments-thread"><Components.Loading/></div>

  } else {

    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

    return (
      <div className="posts-comments-thread">

        {!!props.currentUser ?
          <div className="posts-comments-thread-new">
            <Components.CommentsNewForm
              postId={postId}
              type="comment"
            />
          </div> :
          <div>
            <Components.ModalTrigger size="small" component={<a href="#"><FormattedMessage id="comments.please_log_in"/></a>}>
              <Components.AccountsLoginForm/>
            </Components.ModalTrigger>
          </div>
        }
        <Components.CommentsList comments={nestedComments} commentCount={totalCount}/>
      </div>
    );
  }
};


replaceComponent('PostsCommentsThread', CustomPostsCommentsThread);
