'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: [
      'email',
      'user_about_me',
      'user_managed_groups',
      'user_likes',
      'user_posts',
      'user_videos',
      'read_insights',
      'read_audience_network_insights',
      'manage_pages',
      'publish_pages',
      'publish_actions',
      'pages_show_list',
      'pages_manage_cta',
      'pages_manage_instant_articles',
      'ads_read',
      'ads_management',
      'pages_messaging'
    ],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

export default router;
