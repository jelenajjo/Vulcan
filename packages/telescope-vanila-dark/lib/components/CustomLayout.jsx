import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";

class CustomLayout extends Component {

  render() {

    return (
      <div className="wrapper" id="wrapper">

          <Telescope.components.Newsletter />


        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />

        <Telescope.components.Header {...this.props}/>

        <div className="main">

          {this.props.children}

        </div>

        <Telescope.components.Footer {...this.props}/>

      </div>
    )

  }
}

CustomLayout.displayName = "Layout";

module.exports = CustomLayout;
