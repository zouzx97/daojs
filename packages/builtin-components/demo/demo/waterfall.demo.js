import React from 'react';
import builtinComponents from '../../src/index';
import fakeData from './fakeData.demo';

const {
  Waterfall,
} = builtinComponents;



export default function WaterfallDemo() {
  return (
    <Waterfall source={fakeData.waterFall} />
  );
}
