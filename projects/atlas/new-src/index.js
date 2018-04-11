import ReactDOM from 'react-dom';
import React from 'react';
import echarts from 'echarts';
import 'antd/dist/antd.css';
import _ from 'lodash';
import Promise from 'bluebird';
import './index.css';
import layout from './ui/layout/config';
import StoryBoard from './ui/story-board';
import daoTheme1 from './assets/DaoTheme1.json';

// global config for bluebird
Promise.config({
  cancellation: true,
});

echarts.registerTheme('theme1', daoTheme1);

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g; // eslint-disable-line

ReactDOM.render(
  (
    <StoryBoard layout={layout} />
  ), document.getElementById('bestcustomer'),
);
