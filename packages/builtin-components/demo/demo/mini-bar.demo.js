import React from 'react';
import moment from 'moment';
import builtinComponents from '../../src/index';

const {
  MiniBar,
} = builtinComponents;

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}


export default function MiniAreaDemo() {
  return (
    <MiniBar
      height={100}
      data={visitData}
    />
  );
}
