import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { replaceComponent } from 'meteor/vulcan:core';

const CustomFooter = props => {
  return (
    <div className="footer">
    Powered by <a href="http://vulcanjs.org" target="_blank">Vulcan</a> ,
    Crafted by <a href="https://vanila.io" target="_blank">Vanila.io</a>
    </div>
  )
}


replaceComponent('Footer', CustomFooter);
