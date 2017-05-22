import Telescope from 'meteor/nova:lib';
import React from 'react';
import { ListContainer } from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";

const CustomPostsListHeader = () => {

  return (
    <div>
      <div className="posts-list-header">
        {/*<Telescope.components.PostsViews />*/}
      </div>
    </div>
  )
}

CustomPostsListHeader.displayName = "PostsListHeader";

module.exports = CustomPostsListHeader;
export default CustomPostsListHeader;
