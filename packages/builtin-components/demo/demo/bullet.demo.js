import React from 'react';
import builtinComponents from '../../src/index';

const {
  Bullet,
} = builtinComponents;

const source = [
  {
    team: 'team1',
    actual: 110,
    target: 95,
    normal: 70,
    good: 15,
    excellent: 15,
  },
  {
    team: 'team2',
    actual: 94,
    target: 90,
    normal: 70,
    good: 15,
    excellent: 15,
  },
  {
    team: 'team3',
    actual: 97,
    target: 90,
    normal: 70,
    good: 15,
    excellent: 15,
  },
  {
    team: 'team4',
    actual: 78,
    target: 90,
    normal: 70,
    good: 15,
    excellent: 15,
  },
  {
    team: 'team5',
    actual: 68,
    target: 85,
    normal: 70,
    good: 15,
    excellent: 15,
  },
];

export default function BulletDemo() {
  return (
    <Bullet source={source} />
  );
}
