import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Storyboard from './storyboard';

const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;

const contentStyle = {
  background: '#f0f2f5',
  padding: 24,
};

function renderStoryMenuItem(story) {
  return <Item key={story.id}>{story.name}</Item>;
}

function reunderCategorySubMenuTitle(category) {
  return (
    <span>
      <Icon type="mail" />
      <span>{category.name}</span>
    </span>
  );
}

function renderCategorySubMenu(category) {
  const { stories } = category;
  return (
    <SubMenu key={category.id} title={reunderCategorySubMenuTitle(category)} >
      { _.map(stories, renderStoryMenuItem) }
    </SubMenu>
  );
}


export default class AppFrame extends React.Component {
  constructor(props) {
    super(props);

    const {
      defaultStory,
      categories,
    } = this.props;

    let selectedStory = defaultStory;
    let selectedCategory = null;

    this.storyIndex = _.reduce(categories, (memo, category) => {
      const { stories } = category;
      return _.reduce(stories, (m, story) => {
        _.extend(m, { [story.id]: story });
        selectedStory = selectedStory || story.id;
        if (selectedStory === story.id) {
          selectedCategory = category.id;
        }
        return m;
      }, memo);
    }, {});

    this.state = { selectedStory: 'b47efc62-da23-49d6-ab9c-2a734d53299a', selectedCategory };
  }

  render() {
    const {
      logo,
      title,
      categories,
    } = this.props;

    return (
      <Layout>
        <Header className="header">
          <div style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            height: '100%',
            width: '100px',
            backgroundImage: `url(${logo})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          />
          <h3 style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            color: '#eee',
          }}
          >
            { title }
          </h3>
        </Header>
        <Layout>
          <Sider>
            <Menu
              theme="dark"
              defaultSelectedKeys={[this.state.selectedStory]}
              defaultOpenKeys={[this.state.selectedCategory]}
              mode="inline"
              onSelect={({ key }) => { this.setState({ selectedStory: key }); }}
            >
              { _.map(categories, renderCategorySubMenu) }
            </Menu>
          </Sider>
          <Layout style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
            <Content style={contentStyle}>
              <Storyboard story={this.storyIndex[this.state.selectedStory] || {}} engine="dist/engine.js" />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
