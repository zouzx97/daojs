import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import uuid from 'uuid4';
import './style/app-frame.css';
import StoryEditor from './story-editor';
// import CustomStoryEditor from './custom-story';

const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;

const contentStyle = {
  background: '#f0f2f5',
  padding: 24,
};

export default class AppFrameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      configDetails: {},
      categoryList: [],
    };
  }

  addCategory() {
    const { configDetails, categoryList } = this.state;
    const categoryId = uuid();
    this.setState({
      categoryList: [...categoryList, categoryId],
      configDetails: {
        ...configDetails,
        [categoryId]: {
          name: '',
          stories: [],
        },
      },
    });
  }

  addStory(categoryId) {
    const { configDetails } = this.state;
    const { stories: categoryStories } = configDetails[categoryId];
    const storyId = uuid();
    this.setState({
      configDetails: {
        ...configDetails,
        [categoryId]: {
          ...configDetails[categoryId],
          stories: [...categoryStories, storyId],
        },
        [storyId]: {
          name: '',
          content: {},
        },
      },
    });
  }

  renderInputItem(id) {
    const { configDetails } = this.state;
    const { name } = configDetails[id];
    return (
      <span>
        <Icon type="mail" />
        <span>
          <Input
            style={{
              maxWidth: '80%',
            }}
            value={name}
            onChange={event => this.setState({
              configDetails: {
                ...configDetails,
                [id]: {
                  ...configDetails[id],
                  name: event.target.value,
                },
              },
            })}
          />
        </span>
      </span>
    );
  }

  renderStories(categoryId) {
    const { configDetails } = this.state;
    const { stories } = configDetails[categoryId];
    const storiesItems = _.map(stories, storyId => (
      <Item key={storyId}>
        {this.renderInputItem(storyId)}
      </Item>
    ));
    storiesItems.push((
      <Item key="add-story">
        <span
          role="presentation"
          onClick={() => this.addStory(categoryId)}
          onKeyDown={() => this.addStory(categoryId)}
        >
          <Icon type="plus-circle" />
          <span>Add story</span>
        </span>
      </Item>
    ));
    return storiesItems;
  }

  renderCategories() {
    const { categoryList } = this.state;
    const categories = _.map(categoryList, categoryId => (
      <SubMenu key={categoryId} title={this.renderInputItem(categoryId)} >
        {this.renderStories(categoryId)}
      </SubMenu>
    ));
    categories.push((
      <SubMenu
        key="add-category"
        title={<span><Icon type="plus-circle" /><span>Add category</span></span>}
        onTitleClick={() => this.addCategory()}
      />));
    return categories;
  }

  render() {
    const {
      logo,
      title,
      selectedStory,
      configDetails,
      // selectedCategory,
    } = this.state;

    const storyContent = _.get(configDetails, `${selectedStory}.content`);
    const rightContent = storyContent ? (<StoryEditor
      value={configDetails[selectedStory].content}
      onChange={val => this.setState({
        configDetails: {
          ...configDetails,
          [selectedStory]: {
            ...configDetails[selectedStory],
            content: val,
          },
        },
      })}
    />) : (<span>{JSON.stringify(configDetails[selectedStory])}</span>);

    return (
      <Layout className="dao-app-frame">
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
            <Input
              placeholder="please input title"
              value={title}
              onChange={event => this.setState({ title: event.target.value })}
            />
          </h3>
        </Header>
        <Layout>
          <Sider
            // collapse when window width < 992px
            breakpoint="lg"
            collapsedWidth={0}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={[selectedStory]}
              // defaultOpenKeys={[selectedCategory]}
              mode="inline"
              onSelect={({ key }) => {
                this.setState({ selectedStory: key });
              }}
            >
              { this.renderCategories() }
            </Menu>
          </Sider>
          <Layout style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
            <Content style={contentStyle}>
              {rightContent}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
