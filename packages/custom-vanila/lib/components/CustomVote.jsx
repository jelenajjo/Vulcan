import { Components, registerComponent, withMessages, replaceComponent, getRawComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { withVote, hasUpvoted, hasDownvoted } from 'meteor/vulcan:voting';
import { FormattedMessage, intlShape } from 'react-intl';

class CustomVote  extends getRawComponent('Vote')  {

  constructor() {
    super();
    this.upvote = this.upvote.bind(this);
    this.getActionClass = this.getActionClass.bind(this);
    // this.startLoading = this.startLoading.bind(this);
    // this.stopLoading = this.stopLoading.bind(this);
    this.state = {
      loading: false
    }
  }

  /*

  note: with optimisitc UI, loading functions are not needed
  also, setState triggers issues when the component is unmounted
  before the vote mutation returns.

  */

  // startLoading() {
  //   this.setState({ loading: true });
  // }

  // stopLoading() {
  //   this.setState({ loading: false });
  // }

  upvote(e) {
    e.preventDefault();

    // this.startLoading();

    const document = this.props.document;
    const collection = this.props.collection;
    const user = this.props.currentUser;

    if(!user){
      this.props.flash(this.context.intl.formatMessage({id: 'users.please_log_in'}));
      // this.stopLoading();
    } else {
      const voteType = hasUpvoted(user, document) ? "cancelUpvote" : "upvote";
      this.props.vote({document, voteType, collection, currentUser: this.props.currentUser}).then(result => {
        // this.stopLoading();
      });
    }
  }

  getActionClass() {
    const document = this.props.document;
    const user = this.props.currentUser;

    const isUpvoted = hasUpvoted(user, document);
    const isDownvoted = hasDownvoted(user, document);
    const actionsClass = classNames(
      'vote',
      {voted: isUpvoted || isDownvoted},
      {upvoted: isUpvoted},
      {downvoted: isDownvoted}
    );

    return actionsClass;
  }

  render() {
    return (
      <div className={this.getActionClass()}>
        <a className="upvote-button" onClick={this.upvote}>
        <div className="voteArrow">
        {this.state.loading ? <Components.Icon name="spinner" /> : <Components.Icon name="upvote" /> }
        <div className="sr-only">Upvote</div>
        </div>
          <div className="voteNumber">
          <div className="vote-count">{this.props.document.baseScore || 0}</div>
          </div>
        </a>
      </div>
    )
  }

}

replaceComponent('Vote', CustomVote, withMessages, withVote);
