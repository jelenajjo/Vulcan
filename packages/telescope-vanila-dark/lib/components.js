/*
This file centralizes all our custom component overrides.
*/

import Telescope from 'meteor/nova:lib';

import CustomHeadTags from "./components/CustomHeadTags";
import CustomLogo from "./components/CustomLogo.jsx";
import CustomNewsletter from "./components/CustomNewsletter.jsx";
import CustomPostsItem from "./components/CustomPostsItem.jsx";
import CustomHeader from "./components/CustomHeader.jsx";
import CustomPostsNewButton from "./components/CustomPostsNewButton.jsx";
import CustomVote from "./components/CustomVote.jsx";
import CustomUsersMenu from "./components/CustomUsersMenu.jsx";
import CustomPostsLoadMore from "./components/CustomPostsLoadMore.jsx";
import CustomCategoriesList from "./components/CustomCategoriesList.jsx";
import CustomPostsListHeader from "./components/CustomPostsListHeader.jsx";
import CustomPostsPage from "./components/CustomPostsPage.jsx";
import CustomPostsCommentsThread from "./components/CustomPostsCommentsThread.jsx";
import CustomCommentsItem from "./components/CustomCommentsItem.jsx";
import CustomPostsCategories from "./components/CustomPostsCategories.jsx";
import CustomFooter from "./components/CustomFooter.jsx";
import CustomPostsViews from "./components/CustomPostsViews.jsx";
import CustomLayout from "./components/CustomLayout.jsx";
import CustomNewsletterButton from "./components/CustomNewsletterButton";


Telescope.components.HeadTags = CustomHeadTags;
Telescope.components.Logo = CustomLogo;
Telescope.components.Newsletter = CustomNewsletter;
Telescope.components.PostsItem = CustomPostsItem;
Telescope.components.Header = CustomHeader;
Telescope.components.PostsNewButton = CustomPostsNewButton;
Telescope.components.Vote = CustomVote;
Telescope.components.UsersMenu = CustomUsersMenu;
Telescope.components.PostsLoadMore = CustomPostsLoadMore;
Telescope.components.CategoriesList = CustomCategoriesList;
Telescope.components.PostsListHeader = CustomPostsListHeader;
Telescope.components.PostsPage = CustomPostsPage;
Telescope.components.PostsCommentsThread = CustomPostsCommentsThread;
Telescope.components.CommentsItem = CustomCommentsItem;
Telescope.components.PostsCategories = CustomPostsCategories;
Telescope.components.Footer = CustomFooter;
Telescope.components.PostsViews = CustomPostsViews;
Telescope.components.Layout = CustomLayout;
Telescope.components.NewsletterButton = CustomNewsletterButton;
