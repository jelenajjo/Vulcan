import Telescope from 'meteor/nova:lib';
import React from 'react';
//import { Messages } from "meteor/nova:core";
import { Link } from 'react-router';
import Posts from "meteor/nova:posts";
import Categories from "meteor/nova:categories";
import { ListContainer } from "meteor/utilities:react-list-container";
import { FlashContainer } from "meteor/nova:core";

const CustomHeader = (props, {currentUser}) => {

  const logoUrl = Telescope.settings.get("logoUrl");
  const siteTitle = Telescope.settings.get("title", "Nova");
  const tagline = Telescope.settings.get("tagline");

  return (


    <div className="header-wrapper">
      <header id="header" className="header navbar navbar-default">
        <div className="hideOnMobile">
        <div className="logo">
          <Telescope.components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>

        <div className="posts-lists-header-categories">
          <ListContainer
            collection={Categories}
            limit={0}
            resultsPropName="categories"
            component={Telescope.components.CategoriesList}
            listId="categories"
          />
        </div>
        <Telescope.components.PostsViews />
        <Telescope.components.SearchForm />

        <div className="nav">

          <div className="nav-new-post">
            <Telescope.components.PostsNewButton/>
          </div>

          <div className="nav-user btn btn-default">
            {currentUser ? <Telescope.components.UsersMenu/> : <Telescope.components.UsersAccountMenu/>}
          </div>

        </div>
        </div>

        <div className="displayOnMobile">
        <div className="logo">
          <Telescope.components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>

        <div className="nav">
        <div className="posts-lists-header-categories">
          <ListContainer
            collection={Categories}
            limit={0}
            resultsPropName="categories"
            component={Telescope.components.CategoriesList}
            listId="categories"
          />
        </div>
        <div className="userMenuWrapper">
          <div className="nav-new-post">
            <Telescope.components.PostsNewButton/>
          </div>

          <div className="nav-user btn btn-default">
            {currentUser ? <Telescope.components.UsersMenu/> : <Telescope.components.UsersAccountMenu/>}
          </div>
          </div>
        </div>

        <Telescope.components.PostsViews />
        <Telescope.components.SearchForm />


        </div>
      </header>
    </div>
  )
}

CustomHeader.displayName = "Header";

CustomHeader.contextTypes = {
  currentUser: React.PropTypes.object,
};

module.exports = CustomHeader;
