import React from 'react';
import { FormattedMessage } from 'react-intl';

const CustomPostsLoadMore = ({loadMore, count, totalCount}) => {
  return (
    <a className="posts-load-more" onClick={loadMore}>
      <span>Load more</span>
      &nbsp;
      {totalCount ? <span className="load-more-count"></span> : null}
    </a>
  )
}

CustomPostsLoadMore.displayName = "PostsLoadMore";

module.exports = CustomPostsLoadMore;
