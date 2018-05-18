import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp5 } from '@daojs/advanced-components';

const { GridLayout } = builtinComponents;

export default function Comp5Demo() {
  return (
    <GridLayout>
      <Comp5 title="2562" subTitle="Total Sales today" icon="share-alt" />
      <Comp5 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />

      <Comp5 title="2562" subTitle="Total Sales today" icon="share-alt" />
      <Comp5 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
    </GridLayout>
  );
}
