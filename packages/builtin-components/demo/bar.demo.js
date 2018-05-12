import React from 'react';
import builtinComponents from '../src/index';

const {
  Bar,
} = builtinComponents;


const data = [{
  timestamp: '2018/1/1',
  value: 10,
}, {
  timestamp: '2018/1/2',
  value: 20,
}, {
  timestamp: '2018/1/3',
  value: 40,
}, {
  timestamp: '2018/1/4',
  value: 48,
}, {
  timestamp: '2018/1/5',
  value: 32,
}, {
  timestamp: '2018/1/6',
  value: 60,
}, {
  timestamp: '2018/1/7',
  value: 50,
}, {
  timestamp: '2018/1/8',
  value: 40,
}, {
  timestamp: '2018/1/9',
  value: 30,
}, {
  timestamp: '2018/1/10',
  value: 20,
}, {
  timestamp: '2018/1/11',
  value: 10,
}, {
  timestamp: '2018/1/12',
  value: 30,
}, {
  timestamp: '2018/1/13',
  value: 25,
}];

export default function BarDemo() {
  return (
    <div>
      <div> Vertical Bar</div>
      <Bar
        source={data}
            // default isHorizontal is false
        isHorizontal={false}
      />
      <div> Horizontal Bar</div>
      <Bar
        source={data}
        isHorizontal
      />
    </div>
  );
}
