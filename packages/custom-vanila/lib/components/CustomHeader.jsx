import React from 'react';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomHeader = (props, context) => {

  const logoUrl = getSetting("logoUrl");
  const siteTitle = getSetting("title", "My App");
  const tagline = getSetting("tagline");

  return (
    <div className="header-wrapper">

      <header id="header" className="header navbar navbar-default">
        <div className="hideOnMobile">
          <div className="logo">
            <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
            {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
          </div>

          <div className="posts-lists-header-categories">
          <Components.CategoriesList />
          </div>

          <Components.PostsViews />
          <Components.SearchForm/>

        <div className="nav">
          <div className="nav-new-post">
            <Components.PostsNewButton/>
          </div>

          <div className="nav-user">
            {!!props.currentUser ? <Components.UsersMenu/> : <Components.UsersAccountMenu/>}
          </div>

        </div>
        </div>

        <div className="displayOnMobile">
        <div className="logo">
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>
        </div>

      </header>
    </div>
  )
}



replaceComponent('Header', CustomHeader, withCurrentUser);
