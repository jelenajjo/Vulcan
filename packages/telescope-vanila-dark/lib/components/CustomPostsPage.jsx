import Telescope from 'meteor/nova:lib';
import React from 'react';
import Posts from "meteor/nova:posts";

const CustomPostsPage = ({document, currentUser}) => {

  const post = document;
  const htmlBody = {__html: post.htmlBody};

  return (
    <div className="posts-page">

      <Telescope.components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} />

      <Telescope.components.PostsItem post={post}/>

      {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}

      <Telescope.components.PostsCommentsThread document={post} />

      {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}



    </div>
  )
};


module.exports = CustomPostsPage;
export default CustomPostsPage;
