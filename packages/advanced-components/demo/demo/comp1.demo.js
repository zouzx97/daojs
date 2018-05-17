import React from 'react';
import builtinComponents from '@daojs/builtin-components';
import { Comp1 } from '@daojs/advanced-components';

const { GridLayout } = builtinComponents;

export default function Comp1Demo() {
  return (
    <GridLayout>
      <div style={{ width: '250px', height: '120px', margin: '10px' }} >
        <Comp1 title="13432" subTitle="Total Sales today" percent={12} />
      </div>
      <div style={{ width: '250px', height: '120px', margin: '10px' }} >
        <Comp1 title="52000" subTitle="Total Earning" percent={52} />
      </div>
      <div style={{ width: '250px', height: '120px', margin: '10px' }} >
        <Comp1 title="1392" subTitle="Daily visitors" percent={62} />
      </div>
      <div style={{ width: '250px', height: '120px', margin: '10px' }} >
        <Comp1 title="19" subTitle="Pending Orders" percent={100} />
      </div>

      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="2562" subTitle="Total Sales today" percent={35} />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="5685" subTitle="Daily visitors" percent={75} />
      </div>
      <div style={{ width: '300px', height: '130px', margin: '20px' }} >
        <Comp1 title="12480" subTitle="Total Earning" percent={58} />
      </div>

      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp1 title="62" subTitle="Pending Orders" percent={62} />
      </div>
      <div style={{ width: '500px', height: '160px', margin: '20px' }} >
        <Comp1 title="1024" subTitle="Finished Orders" percent={99} />
      </div>

      <div style={{ width: '800px', height: '220px', margin: '20px' }} >
        <Comp1 title="10240" subTitle="Orders" percent={50} />
      </div>

    </GridLayout>
  );
}
