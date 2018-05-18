import React from 'react';
import moment from 'moment';
import builtinComponents from '@daojs/builtin-components';
import { Comp8 } from '@daojs/advanced-components';

const {
  GridLayout, MiniArea, MiniTable, MiniBar, MiniProgress,
} = builtinComponents;


const tableData = [
  ['Free Space', '132 Gb'],
  ['Used Space', '1.45 Gb'],
];


const table = (<MiniTable data={tableData} />);

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

export default function Comp8Demo() {
  return (
    <GridLayout>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp8 title="HDD Usage" icon="share-alt" body={table} chart={<MiniArea data={visitData} />} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp8 title="Earning" body={table} chart={<MiniBar data={visitData} />} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp8 title="Sales" icon="tag-o" body={table} chart={<MiniBar data={visitData} />} />
      </div>
      <div style={{ width: '300px', height: '200px', margin: '20px' }} >
        <Comp8 title="Task progress" body={table} chart={<MiniArea data={visitData} />} />
      </div>
    </GridLayout>
  );
}
