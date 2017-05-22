import React from 'react';
import { Link } from 'react-router';

const CustomPostsCategories = ({post}) => {
  return (
    <div className="posts-categories">
      {post.categoriesArray.map(category =>
        <Link className={category.slug} key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
      )}
    </div>
  )
};

CustomPostsCategories.displayName = "PostsCategories";

module.exports = CustomPostsCategories;
