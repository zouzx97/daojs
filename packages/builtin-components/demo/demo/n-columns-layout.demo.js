import React from 'react';
import _ from 'lodash';
import { ThemeContext } from '@daojs/contexts';
import builtinComponents from '../../src/index';

const {
  NColumnsLayout,
} = builtinComponents;


const data = _.range(20);

function Item(props) {
  return (
    <ThemeContext.Consumer>
      {({ primaryColor }) => (
        <div
          style={{
            height: 100,
            width: '100%',
            backgroundColor: primaryColor,
          }}
        />
      )}
    </ThemeContext.Consumer>
  );
}

export default function NColumnsLayoutDemo() {
  return (
    <NColumnsLayout n={3}>
      {data.map((item, index) => (
        <Item key={String(index)} item={item} />
      ))}
    </NColumnsLayout>
  );
}
