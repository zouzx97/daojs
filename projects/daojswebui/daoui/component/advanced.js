import React, { Component } from 'react';
import _ from 'lodash';
import { search } from '../repository';
import ComponentList from './advanced-component-list';
import ComponentSearch from './componentSearch';
import ComponentDetail from './componentDetailHoC';
import HomeLayout from './home-layout';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comps: [],
      showResults: false,
      selectedCompName: '',
    };
  }

  componentDidMount() {
    this.onSearch();
  }

  onSearch = query => search({ query }).then((comps) => {
    this.setState({
      comps,
      showResults: true,
      selectedCompName: '简易卡片1',
    });
  })

  onSelect = (selectedCompName) => {
    this.setState({ selectedCompName });
  }

  render() {
    const LeftComp = (
      <React.Fragment>
        <ComponentSearch
          onSearch={this.onSearch}
          style={{ width: '100%' }}
        />
        <ComponentList
          comps={this.state.comps}
          selectedCompName={this.state.selectedCompName}
          showResults={this.state.showResults}
          onSelect={this.onSelect}
        />
      </React.Fragment>
    );

    const RightComp = (
      <ComponentDetail name={this.state.selectedCompName} />
    );

    return (
      <HomeLayout LeftComp={LeftComp} RightComp={RightComp} />
    );
  }
}
