import React from 'react';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  WordCloud,
} = builtinComponents;



export default function WordCloudDemo() {
  return (
    <WordCloud source={fakeData.wordCloud} />
  );
}
