import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp2 } from '@daojs/advanced-components';

const { GridLayout } = builtinComponents;

export default function Comp2Demo() {
  return (
    <div style={{ background: '#F5F6F5' }}>
      <GridLayout>
        <Comp2 title="2562" subTitle="Total Sales today" icon="share-alt" />
        <Comp2 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
        <Comp2 title="12480" subTitle="Total Earning" icon="tag-o" />
        <Comp2 title="62" subTitle="Pending Orders" icon="star-o" />
        <Comp2 title="2562" subTitle="Total Sales today" icon="share-alt" />
        <Comp2 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
        <Comp2 title="2562" subTitle="Total Sales today" icon="share-alt" />
        <Comp2 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      </GridLayout>
    </div>
  );
}
