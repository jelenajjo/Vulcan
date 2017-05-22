import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, Glyphicon } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";

const CustomPostsNewButton = (props, context) => {

  const size = context.currentUser ? "large" : "small";
  const button = <Button className="posts-new-button" bsStyle="primary"><Glyphicon glyph="plus" /> Add post</Button>;
  return (
    <ModalTrigger size={size} title={context.intl.formatMessage({id: "posts.new_post"})} component={button}>
      <Telescope.components.PostsNewForm/>
    </ModalTrigger>
  )
}

CustomPostsNewButton.displayName = "PostsNewButton";

CustomPostsNewButton.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
}

export default CustomPostsNewButton;
