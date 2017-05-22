import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { ModalTrigger } from "meteor/nova:core";
import { Link } from 'react-router';
import Posts from "meteor/nova:posts";
import Categories from "meteor/nova:categories";


class CustomPostsItem extends Telescope.components.PostsItem {

  render() {

    const post = this.props.post;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    // ⭐ custom code starts here ⭐
    if (post.color) {
      postClass += " post-"+post.color;
    }
    // ⭐ custom code ends here ⭐

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Telescope.components.Vote post={post} />
        </div>

        <div className="posts-item-content">
          {post.url ? <span className="post-url-domain">{Telescope.utils.getDomain(post.url)}</span> : null}
          <h3 className="posts-item-title">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
          </h3>
          <div className="posts-item-meta">
            {this.renderCategories()}
            {post.user? <div className="posts-item-user"><Telescope.components.UsersAvatar user={post.user} size="small"/><Telescope.components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date">
            <Link to={Posts.getPageUrl(post)}>
              <FormattedRelative value={post.postedAt}/></Link>
            </div>
            {post.commentCount?
            <div className="posts-item-comments">
                <span> &#8226; </span> <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
            </div>
            : ""}
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
};



CustomPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

CustomPostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default CustomPostsItem;
