import { Components, registerComponent, withMutation, withCurrentUser, withMessages, Utils, replaceComponent, getRawComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

class CustomNewsletterButton extends getRawComponent("NewsletterButton") {
  constructor(props) {
    super(props);
    this.subscriptionAction = this.subscriptionAction.bind(this);
  }

  // use async/await + try/catch <=> promise.then(res => ..).catch(e => ...)
  async subscriptionAction() {

    const {
      flash,
      mutationName,
      successCallback,
      user,
      [mutationName]: mutationToTrigger, // dynamic 'mutationToTrigger' variable based on the mutationName (addUserNewsletter or removeUserNewsletter)
    } = this.props;

    try {
      const mutationResult = await mutationToTrigger({userId: user._id});

      successCallback(mutationResult);
    } catch(error) {
      console.error(error); // eslint-disable-line no-console
      flash(
        this.context.intl.formatMessage(Utils.decodeIntlError(error)),
        "error"
      );
    }
  }

  render() {

    return (
      <div id="lpCTA" className="lp">
        <div className="col-md-6 lpImg">
          <img src="/packages/custom-vanila/public/img/Reading.svg"></img>
        </div>
        <div className="col-md-6 lpText vcenter">
          <h4 className="lpRed">TL;TR</h4>
          <h5>Too <strong>Long</strong>; To <strong>Read</strong></h5>
          <p className="pDesc">
            The key to <strong>learning</strong><br></br> is to <strong>read</strong> only critical<br></br> information in <strong>less time</strong>.
          </p>
          <p className="lpSideNote">
            <span className="lpRed">Study Result:</span> With TL;TR you can boost your learning by 340%
          </p>
        <Button
          className="newsletter-button lpSub btn"
          onClick={this.subscriptionAction}
          bsStyle="primary"
        >
          Join our TL;TR newsletter
        </Button>
        <div className="goDownCont">
          <a onClick={this.dismissBanner} className="btn goDown newsletter-close"><i className="icon fa fa-fw fa-chevron-down icon-downvote"></i></a>
        </div>
      </div>
      </div>
    )
  }
}


const addOptions = {name: 'addUserNewsletter', args: {userId: 'String'}};
const removeOptions = {name: 'removeUserNewsletter', args: {userId: 'String'}};

replaceComponent('NewsletterButton', CustomNewsletterButton);
