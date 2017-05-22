import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

import { replaceComponent, registerComponent, Utils, getSetting, Headtags, getRawComponent } from 'meteor/vulcan:core';

class CustomHeadTags extends getRawComponent('HeadTags') {
	render() {

		const url = !!this.props.url ? this.props.url : Utils.getSiteUrl();
		const title = !!this.props.title ? this.props.title : getSetting("title", "My App");
		const description = !!this.props.description ? this.props.description : getSetting("tagline") || getSetting("description");


		let image = !!getSetting("siteImage") ? getSetting("siteImage"): getSetting("logoUrl");

		if (!!this.props.image) {
			image = this.props.image;
		}

		// add site url base if the image is stored locally
		if (!!image && image.indexOf('//') === -1) {
			image = Utils.getSiteUrl() + image;
		}

		// add <meta /> markup specific to the page rendered
		const meta = Headtags.meta.concat([
			{ charset: "utf-8" },
			{ name: "description", content: description },
			// responsive
			{ name: "viewport", content:"width=device-width, initial-scale=1" },
			// facebook
			{ property: "og:type", content: "article" },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			//twitter
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:image:src", content: image },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description }
		]);

		// add <link /> markup specific to the page rendered
		const link = Headtags.link.concat([
			{ rel: "canonical", href: url },
			{ rel: "shortcut icon", href: getSetting("faviconUrl", "/img/favicon.ico") },
		  { rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css' },
		  { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
		]);

		return (
			<div>
				<Helmet title={title} meta={meta} link={link} script={Headtags.script} />
			</div>
		);
	}
}


replaceComponent('HeadTags', CustomHeadTags);
