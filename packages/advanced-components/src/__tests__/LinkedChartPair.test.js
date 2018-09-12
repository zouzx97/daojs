import { mount } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import LinkedChartPair from '../components/LinkedChartPair';
import source from '../../demo/demo/data.demo';

const charts0 = [
  { type: 'bar', metric: '销量', dimension: 'age' },
  { type: 'donut', metric: '销量', dimension: 'skuType' },
];
const charts1 = [
  { type: 'line', metric: '销量', dimension: 'age' },
  { type: 'bar', metric: '销量', dimension: 'skuType' },
];
const charts2 = [
  { type: 'donut', metric: '销量', dimension: 'branchName' },
  { type: 'line', metric: '销量', dimension: 'skuType' },
];
let wrapper;
describe('test LinkedChartPair', () => {
  describe('test bar with donut', () => {
    beforeAll(() => {
      wrapper = mount(<LinkedChartPair charts={charts0} source={source} />);
    });
    it('test throw', () => {
      expect(() => {
        mount(<LinkedChartPair charts={charts0} source={source} />);
      }).not.toThrow();
    });
    describe('test initially', () => {
      it('props should be correct', () => {
        expect(wrapper.instance().props.charts).toEqual(charts0);
        expect(wrapper.instance().props.source).toEqual(source);
      });
      it('dimension should be null', () => {
        expect(wrapper.state('dimension')).toBeNull();
      });
    });
    describe('test render', () => {
      it('should have one bar and one donut', () => {
        expect(wrapper.find('Bar').length).toBe(1);
        expect(wrapper.find('Donut').length).toBe(1);
      });
    });
  });
  describe('test line with bar', () => {
    beforeAll(() => {
      wrapper = mount(<LinkedChartPair charts={charts1} source={source} />);
    });
    it('test throw', () => {
      expect(() => {
        mount(<LinkedChartPair charts={charts1} source={source} />);
      }).not.toThrow();
    });
    describe('test state initially', () => {
      it('props should be correct', () => {
        expect(wrapper.instance().props.charts).toEqual(charts1);
        expect(wrapper.instance().props.source).toEqual(source);
      });
      it('dimension should be null', () => {
        expect(wrapper.state('dimension')).toBeNull();
      });
    });
    describe('test render', () => {
      it('should have one line and one bar', () => {
        expect(wrapper.find('Bar').length).toBe(1);
        expect(wrapper.find('Line').length).toBe(1);
      });
    });
  });
  describe('test donut with line', () => {
    beforeAll(() => {
      wrapper = mount(<LinkedChartPair charts={charts2} source={source} />);
    });
    it('test throw', () => {
      expect(() => {
        mount(<LinkedChartPair charts={charts2} source={source} />);
      }).not.toThrow();
    });
    describe('test state initially', () => {
      it('props should be correct', () => {
        expect(wrapper.instance().props.charts).toEqual(charts2);
        expect(wrapper.instance().props.source).toEqual(source);
      });
      it('dimension should be null', () => {
        expect(wrapper.state('dimension')).toBeNull();
      });
    });
    describe('test render', () => {
      it('should have one donut and one line', () => {
        expect(wrapper.find('Donut').length).toBe(1);
        expect(wrapper.find('Line').length).toBe(1);
      });
    });
  });

  describe('test click', () => {
    it('setState should be called', () => {
      // console.log(wrapper);
      const spy = jest.spyOn(LinkedChartPair.prototype, 'setState');
      wrapper = mount(<LinkedChartPair charts={charts0} source={source} />);
      wrapper.find('Bar').props().onEvents.click({ name: '24' });
      expect(spy).toHaveBeenCalled();
      expect(wrapper.state('dimension')).toBe('24');
    });
  });

  describe('test data aggregate', () => {
    it('should aggregate correctly', () => {
      wrapper = mount(<LinkedChartPair charts={charts0} source={source} />);
      const dimension = '24';
      const source1 = _.groupBy(_.filter(
        source,
        [charts0[0].dimension,
          _.isNumber(source[0][charts0[0].dimension]) ?
            _.toNumber(dimension) : dimension,
        ],
      ), charts0[1].dimension);
      const dimension1 = Object.getOwnPropertyNames(source1);
      const finalSource = _.map(dimension1, item => ({
        [charts0[1].dimension]: item,
        [charts0[1].metric]: source1[item].length,
      }));
      wrapper.setState({ dimension: '24' });
      expect(wrapper.find('Donut').instance().props.source).toEqual(finalSource);
    });
  });
});
