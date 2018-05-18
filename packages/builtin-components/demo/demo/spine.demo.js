import React from 'react';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  Spine,
} = builtinComponents;

export default function SpineDemo() {
  return (
    <Spine source={fakeData.spineData} />
  );
}
