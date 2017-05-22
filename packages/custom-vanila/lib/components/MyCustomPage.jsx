/*
A new custom page just for our app.
Browse to http://localhost:3000/my-custom-route to see it.
*/



import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import Posts from "meteor/vulcan:posts";
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router'

const MyCustomPage = (props, context) =>
  <Components.ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<Components.AccountsLoginForm />}
    >
      <div className="posts-new-form">
        <Components.SmartForm
          collection={Posts}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
      </div>
    </Components.ShowIf>

MyCustomPage.propTypes = {
  closeModal: React.PropTypes.func,
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
}

MyCustomPage.contextTypes = {
  closeCallback: React.PropTypes.func,
  intl: intlShape
};

MyCustomPage.displayName = "MyCustomPage";

registerComponent('MyCustomPage', MyCustomPage, withRouter, withMessages);
