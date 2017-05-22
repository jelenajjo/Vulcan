import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';
import { Button } from 'react-bootstrap';
import Cookie from 'react-cookie';
import Users from 'meteor/nova:users';
import { FlashContainer } from "meteor/nova:core";

class CustomNewsletter extends Component {

  constructor(props, context) {
    super(props);
    this.subscribeEmail = this.subscribeEmail.bind(this);
    this.successCallbackSubscription = this.successCallbackSubscription.bind(this);
    this.dismissBanner = this.dismissBanner.bind(this);

    const showBanner =
      Cookie.load('showBanner') !== "no" &&
      !Users.getSetting(context.currentUser, 'newsletter_subscribeToNewsletter', false);

    this.state = {
      showBanner: showBanner
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.currentUser) {
      const showBanner =
        Cookie.load('showBanner') !== "no" &&
        !Users.getSetting(nextContext.currentUser, 'newsletter_subscribeToNewsletter', false);

      this.setState({showBanner});
    }
  }

  subscribeEmail(data) {
    this.context.actions.call("newsletter.addEmail", data.email, (error, result) => {
      if (error) {
        console.log(error);
        this.context.messages.flash(error.message, "error");
      } else {
        this.successCallbackSubscription(result);
      }
    });
  }

  successCallbackSubscription(result) {
    this.context.messages.flash(this.context.intl.formatMessage({id: "newsletter.success_message"}), "success");
    this.dismissBanner();
  }

  dismissBanner(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({showBanner: false});

    // set cookie
    Cookie.save('showBanner', "no");
  }

  renderButton() {
    return <Telescope.components.NewsletterButton
              successCallback={() => this.successCallbackSubscription()}
              subscribeText={this.context.intl.formatMessage({id: "newsletter.subscribe"})}
              user={this.context.currentUser}
            />
  }

  renderForm() {
    return (

    <div id="lpCTA" className="lp">
      <div className="col-md-6 lpImg">
        <img src="/packages/telescope-vanila-dark/public/img/Reading.svg"></img>
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
        <FlashContainer component={Telescope.components.FlashMessages}/>

        <Formsy.Form className="newsletter-form" onSubmit={this.subscribeEmail}>
          <Input
            name="email"
            value=""
            placeholder={this.context.intl.formatMessage({id: "newsletter.email"})}
            type="text"
          />
          <Button className="newsletter-button lpSub btn" type="submit">Join our TL;TR newsletter</Button>
        </Formsy.Form>

        <div className="goDownCont">
          <a onClick={this.dismissBanner} className="btn goDown newsletter-close"><i className="icon fa fa-fw fa-chevron-down icon-downvote"></i></a>
        </div>
      </div>
    </div>

    )
  }

  render() {

    return this.state.showBanner
      ? (
        <div className="newsletter">
          {this.context.currentUser ? this.renderButton() : this.renderForm()}
        </div>
      ) : null;
  }
}

CustomNewsletter.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

module.exports = CustomNewsletter;
export default CustomNewsletter;
