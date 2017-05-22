import React from 'react';
import { FormattedMessage } from 'react-intl';

const CustomFooter = props => {
  return (
    <div className="footer">
    Powered by <a href="http://telescopeapp.org" target="_blank">Telescope</a> ,
    Crafted by <a href="https://vanila.io" target="_blank">Vanila.io</a>

    </div>
  )
}

CustomFooter.displayName = "CustomFooter";

module.exports = CustomFooter;
