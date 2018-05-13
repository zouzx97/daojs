import _ from 'lodash';
import Line from './line';

export default class Cumulative extends Line {
  getSource() {
    const rawSource = super.getSource();
    const paddingZero = _.chain(rawSource)
      .first()
      .mapValues(() => 0)
      .value();
    return [
      paddingZero,
      ...rawSource,
    ];
  }

  getOption() {
    return _.defaultsDeep({
      xAxis: {
        axisLabel: {
          showMinLabel: false,
          align: 'right',
        },
      },
    }, super.getOption());
  }
}
