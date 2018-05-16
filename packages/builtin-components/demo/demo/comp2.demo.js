import React from 'react';
import builtinComponents from '../../src/index';

const {
  Comp2,
  GridLayout,
} = builtinComponents;

export default function Comp2Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp2 title="2562" subTitle="Total Sales today" icon="share-alt" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp2 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp2 title="12480" subTitle="Total Earning" icon="tag-o" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp2 title="62" subTitle="Pending Orders" icon="star-o" />
      </div>
    </GridLayout>
  );
}
