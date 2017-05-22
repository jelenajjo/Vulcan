import { Components, registerComponent, withCurrentUser, withMutation, withMessages, Utils, getRawComponent, replaceComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';
import { Button } from 'react-bootstrap';
import Cookie from 'react-cookie';
import Users from 'meteor/vulcan:users';

class CustomNewsletter extends getRawComponent("Newsletter") {

  constructor(props, context) {
    super(props);
    this.subscribeEmail = this.subscribeEmail.bind(this);
    this.successCallbackSubscription = this.successCallbackSubscription.bind(this);
    this.dismissBanner = this.dismissBanner.bind(this);

    this.state = {
      showBanner: showBanner(props.currentUser)
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentUser) {
      this.setState({showBanner: showBanner(nextProps.currentUser)});
    }
  }

  async subscribeEmail(data) {
    try {
      const result = await this.props.addEmailNewsletter({email: data.email});
      this.successCallbackSubscription(result);
    } catch(error) {
      console.error(error); // eslint-disable-line no-console
      this.props.flash(
        this.context.intl.formatMessage(Utils.decodeIntlError(error)),
        "error"
      );
    }
  }

  successCallbackSubscription(result) {
    this.props.flash(this.context.intl.formatMessage({id: "newsletter.success_message"}), "success");
    this.dismissBanner();
  }

  dismissBanner(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({showBanner: false});

    // set cookie to keep the banner dismissed persistently
    Cookie.save('showBanner', "no");
  }

  renderButton() {
    return <Components.NewsletterButton
              label="newsletter.subscribe"
              mutationName="addUserNewsletter"
              successCallback={() => this.successCallbackSubscription()}
              user={this.props.currentUser}
            />
  }

  renderForm() {
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

      <Formsy.Form className="newsletter-form" onSubmit={this.subscribeEmail}>
        <Input
          name="email"
          value=""
          placeholder={this.context.intl.formatMessage({id: "newsletter.email"})}
          type="text"
          layout="elementOnly"
        />
        <Button className="newsletter-button lpSub btn" type="submit" bsStyle="primary">Join our TL;TR newsletter</Button>
      </Formsy.Form>
      <div className="goDownCont">
        <a onClick={this.dismissBanner} className="btn goDown newsletter-close"><Components.Icon name="chevron-down" /></a>
      </div>
    </div>
  </div>
    )
  }

  render() {
    return this.state.showBanner
      ? (
        <div className="newsletter">
          {this.props.currentUser ? this.renderButton() : this.renderForm()}
        </div>
      ) : null;
  }
}

const mutationOptions = {
  name: 'addEmailNewsletter',
  args: {email: 'String'}
}

function showBanner (user) {
  return (
    // showBanner cookie either doesn't exist or is not set to "no"
    Cookie.load('showBanner') !== "no"
    // and user is not subscribed to the newsletter already (setting either DNE or is not set to false)
    && !Users.getSetting(user, 'newsletter_subscribeToNewsletter', false)
  );
}

replaceComponent('Newsletter', CustomNewsletter);
