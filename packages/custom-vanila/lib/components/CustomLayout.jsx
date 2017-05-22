import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomLayout = ({currentUser, children}) =>
  <div className="wrapper" id="wrapper">

    <Components.HeadTags />

    <Components.Newsletter />

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <Components.Header />

    <div className="main">

    <Components.FlashMessages />

      {children}

    </div>

    <Components.Footer />

  </div>

replaceComponent('Layout', CustomLayout, withCurrentUser);
