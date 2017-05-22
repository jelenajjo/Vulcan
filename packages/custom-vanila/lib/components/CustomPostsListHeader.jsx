import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomPostsListHeader = () => {

  return (
    <div>

    </div>
  )
}


replaceComponent('PostsListHeader', CustomPostsListHeader);
