import _ from 'lodash';

const customStoriesIndexesJSON = localStorage.getItem('customeStories.index');

const customStoriesIndexes = JSON.parse(customStoriesIndexesJSON);

const customStories = _.map(customStoriesIndexes, index => JSON.parse(window.localStorage.getItem(`customeStories.${index}`)));

export default customStories;
