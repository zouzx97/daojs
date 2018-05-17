import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp5 } from '@daojs/advanced-components';

const { GridLayout } = builtinComponents;

export default function Comp5Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="2562" subTitle="Total Sales today" icon="share-alt" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      </div>

      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="2562" subTitle="Total Sales today" icon="share-alt" />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="5685" subTitle="Daily visitors" icon="shopping-cart" />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="12480" subTitle="Total Earning" icon="tag-o" />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp5 title="62" subTitle="Pending Orders" icon="star-o" />
      </div>
    </GridLayout>
  );
}
