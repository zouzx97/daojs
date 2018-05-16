import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon, Menu } from 'antd';

function renderCategoryFactory(comps) {
  return function renderCategory(Component, options) {
    const compsToRender = _.filter(comps, comp => _.includes(comp.category, options.key));

    return (
      <Component title={options.title} key={options.key}>
        { _.map(compsToRender, comp => (
          <Menu.Item key={comp.name} >
            <Icon type="dot-chart" />{comp.name}
          </Menu.Item>
        )) }
      </Component>
    );
  };
}

export default class ComponentList extends React.Component {
  static propTypes = {
    comps: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedCompName: PropTypes.string.isRequired,
    showResults: PropTypes.bool.isRequired,
  }

  onClick = ({ key }) => {
    if (!_.some(this.props.comps, ({ name }) => name === key)) {
      return;
    }
    // key is component name
    this.props.onSelect(key);
  }

  render() {
    const {
      comps = [],
      selectedCompName,
      showResults,
    } = this.props;
    const total = comps.length;
    const renderCategory = renderCategoryFactory(comps);

    return (
      <React.Fragment>
        { showResults &&
          <p>{total} component result(s)</p>
        }
        <Menu
          mode="inline"
          defaultOpenKeys={['layout', 'container', 'component']}
          selectedKeys={[selectedCompName]}
          onClick={this.onClick}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >

          { renderCategory(Menu.SubMenu, { title: '卡片', key: 'card' }) }
          { renderCategory(Menu.SubMenu, { title: '容器', key: 'container' }) }
          <Menu.SubMenu title="模块" key="component" >
            { renderCategory(Menu.ItemGroup, { title: '图表', key: 'chart' }) }
            { renderCategory(Menu.ItemGroup, { title: '切片器', key: 'slicer' }) }
            { renderCategory(Menu.ItemGroup, { title: '工具', key: 'utility' }) }
          </Menu.SubMenu>
        </Menu>
      </React.Fragment>
    );
  }
}
