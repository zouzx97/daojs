import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp4 } from '@daojs/advanced-components';

const { GridLayout } = builtinComponents;

export default function Comp4Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="2562" subTitle="Total Sales today" icon="share-alt" footer="Better than last week (50%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="5685" subTitle="Daily visitors" icon="shopping-cart" footer="Better than last week (45%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="12480" subTitle="Total Earning" icon="tag-o" footer="Better than last week (60%)" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp4 title="62" subTitle="Pending Orders" icon="star-o" footer="Better than last week (85%)" />
      </div>
    </GridLayout>
  );
}
