import _ from 'lodash';

const customStoriesIndexesJSON = localStorage.getItem('customeStories.index');

window.console.log(customStoriesIndexesJSON);

const customStoriesIndexes = JSON.parse(customStoriesIndexesJSON);

const customStories = _.map(customStoriesIndexes, index => JSON.parse(window.localStorage.getItem(`customeStories.${index}`)));

window.console.log(customStories);

export default customStories;
