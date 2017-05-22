import { Components, registerComponent, withCurrentUser, replaceComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

const CustomPostsNewButton = (props, context) => {

  const size = props.currentUser ? "large" : "small";
  const button = <Button className="posts-new-button" bsStyle="primary"><Components.Icon name="plus" /> Add post</Button>;
  return (
    <Components.ModalTrigger size={size} title="Create new post" component={button}>
      <Components.PostsNewForm />
    </Components.ModalTrigger>
  )
}



replaceComponent('PostsNewButton', CustomPostsNewButton, withCurrentUser);
