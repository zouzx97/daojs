import React from 'react';
import moment from 'moment';
import builtinComponents from '@daojs/builtin-components';
import { Comp6 } from '@daojs/advanced-components';

const { GridLayout, MiniArea, MiniTable } = builtinComponents;


const data = [
  ['Free Space', '132 Gb'],
  ['Used Space', '1.45 Gb'],
];


const table = (<MiniTable data={data} />);

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}


const chart = (<MiniArea data={visitData} />
);

export default function Comp6Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp6 title="HDD Usage" icon="share-alt" body={table} chart={chart} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp6 title="Earning" body={table} chart={chart} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp6 title="Sales" icon="tag-o" body={table} chart={chart} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp6 title="Task progress" body={table} chart={chart} />
      </div>
    </GridLayout>
  );
}
