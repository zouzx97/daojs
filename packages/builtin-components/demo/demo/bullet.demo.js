import React from 'react';
import builtinComponents from '../../src/index';

const {
  Bullet,
} = builtinComponents;

const source = [
  ['team', 'actual', 'target', 'normal', 'good', 'excellent'],
  ['team1', 110, 95, 70, 15, 15],
  ['team2', 94, 90, 70, 15, 15],
  ['team3', 97, 90, 70, 15, 15],
  ['team4', 78, 90, 70, 15, 15],
  ['team5', 68, 85, 70, 15, 15],
];

export default function BulletDemo() {
  return (
    <Bullet source={source} />
  );
}
