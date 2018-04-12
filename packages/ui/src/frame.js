import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Storyboard from './storyboard';

const { Header, Content, Sider } = Layout;
const { SubMenu, ItemGroup: MenuItemGroup } = Menu;

const contentStyle = {
  background: '#f0f2f5',
  padding: 24,
};


export default class SodexoLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultStory,
    };
    this.stories = _.reduce(
      this.props.categories,
      (memo, { stories }) => _.reduce(stories, (m, story) => _.extend(m, {
        [story.name]: story,
      }), memo),
      {},
    );
  }
  render() {
    const {
      logo,
      title,
      categories,
      componentRegistry,
    } = this.props;

    const story = categories[0].stories[0];

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
            <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" onSelect={({ key }) => { this.setState({ selected: key }); }}>
              { _.map(categories, category => (
                <SubMenu key={category.name} title={<span><Icon type="mail" /><span>{category.name}</span></span>}>
                  { _.map(category.stories, story => (
                    <Menu.Item key={story.name}>{story.name}</Menu.Item>
                  ))}
                </SubMenu>
              )) }

            </Menu>
          </Sider>
          <Layout style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
            <Content style={contentStyle}>
              <Storyboard story={this.stories[this.state.selected] || {}} engine="dist/engine.js" />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
