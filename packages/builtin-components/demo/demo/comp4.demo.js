import React from 'react';
import builtinComponents from '../../src/index';

const {
  Comp4,
  GridLayout,
} = builtinComponents;

export default function Comp4Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="2562" subTitle="Total Sales today" icon="share-alt" percent={50} footer="Better than last week (50%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="5685" subTitle="Daily visitors" icon="shopping-cart" percent={45} footer="Better than last week (45%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="12480" subTitle="Total Earning" icon="tag-o" percent={60} footer="Better than last week (60%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="62" subTitle="Pending Orders" icon="star-o" percent={85} footer="Better than last week (85%)" />
      </div>
    </GridLayout>
  );
}
