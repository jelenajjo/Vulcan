import { registerComponent, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const CustomPostsLoadMore = ({loadMore, count, totalCount}) => {
  return (
    <a className="posts-load-more" href="#" onClick={e => {e.preventDefault(); loadMore();}}>
      <span><FormattedMessage id="posts.load_more"/></span>
    </a>
  )
}


replaceComponent('PostsLoadMore', CustomPostsLoadMore);
