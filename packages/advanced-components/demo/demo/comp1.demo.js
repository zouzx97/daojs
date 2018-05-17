import React from 'react';
import { GridLayout } from '@daojs/builtin-components';
import advancedComponents from '../../src/index';

const {
  Comp1,
} = advancedComponents;

export default function Comp1Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="2562" subTitle="Total Sales today" percent={35} />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="5685" subTitle="Daily visitors" percent={75} />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="12480" subTitle="Total Earning" percent={58} />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="62" subTitle="Pending Orders" percent={62} />
      </div>
    </GridLayout>
  );
}
