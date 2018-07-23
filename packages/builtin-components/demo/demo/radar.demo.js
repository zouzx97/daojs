import React from 'react';
import builtinComponents from '../../src/index';

const {
  Radar,
} = builtinComponents;

const source = [
  {product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7},
  {product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1},
  {product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5},
  {product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1},
];



export default function RadarDemo() {
  return (
    <Radar source={source}/>
  );
}
