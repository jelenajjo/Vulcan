import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomPostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categories.map(category =>
        <Link className={category.slug} key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

replaceComponent('PostsCategories', CustomPostsCategories);
