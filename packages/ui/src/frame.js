import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';

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
      selected: 'dashboard',
    };
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
            <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" onSelect={({ key }) => { this.setState({ selected: key }); }}>
              { categories.map(category => (
                <SubMenu key={category.name} title={<span><Icon type="mail" /><span>{category.name}</span></span>}>
                  { _.map(category.stories, (story, storyName) => (
                    <Menu.Item key={storyName}>{storyName}</Menu.Item>
                  ))}
                </SubMenu>
              )) }

            </Menu>
          </Sider>
          <Layout style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
            <Content style={contentStyle} />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
