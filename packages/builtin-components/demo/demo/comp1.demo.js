import React from 'react';
import builtinComponents from '../../src/index';

const {
  Comp1,
  GridLayout,
} = builtinComponents;

export default function Comp1Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '100px', margin: '20px' }} >
        <Comp1 title="2562" subTitle="Total Sales today" percent={35} />
      </div>
      <div style={{ width: '300px', height: '100px', margin: '20px' }} >
        <Comp1 title="5685" subTitle="Daily visitors" percent={75} />
      </div>
      <div style={{ width: '300px', height: '100px', margin: '20px' }} >
        <Comp1 title="12480" subTitle="Total Earning" percent={58} />
      </div>
      <div style={{ width: '300px', height: '100px', margin: '20px' }} >
        <Comp1 title="62" subTitle="Pending Orders" percent={62} />
      </div>
    </GridLayout>
  );
}
