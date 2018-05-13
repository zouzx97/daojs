import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon, Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import uuid from 'uuid4';
import { ComponentRegistry } from '@daojs/ui';
import './style/app-frame.css';
import StoryEditor from './story-editor';
import AppFrame from './app-frame';

const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;

const contentStyle = {
  background: '#f0f2f5',
  padding: 24,
};

function config2State(config = {}) {
  const { name = '', categories = [] } = config;
  const categoryList = _.map(categories, 'id');
  const configDetails = _.reduce(categories, (ret, category) => {
    const { id, name: categoryName, stories } = category;
    const storiesDetails = _.reduce(stories, (result, story) => {
      const { id: storyId, name: storyName } = story;
      return {
        ...result,
        [storyId]: {
          id: storyId,
          name: storyName,
          content: _.pick(story, ['data', 'layout']),
        },
      };
    }, {});
    return {
      ...ret,
      ...storiesDetails,
      [id]: {
        id,
        name: categoryName,
        stories: _.map(stories, 'id'),
      },
    };
  }, {});

  return {
    name,
    categoryList,
    configDetails,
  };
}

export default class AppFrameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...config2State(props.config),
      isPreviewing: false,
    };
  }

  state2Config() {
    return {
      ...this.props.config,
      name: this.state.name,
      categories: _.map(this.state.categoryList, (categoryId) => {
        const { stories } = this.state.configDetails[categoryId];
        return {
          ...this.state.configDetails[categoryId],
          stories: _.map(stories, storyId => ({
            ..._.omit(this.state.configDetails[storyId], 'content'),
            ...this.state.configDetails[storyId].content,
          })),
        };
      }),
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
          id: categoryId,
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
          id: storyId,
          content: {},
        },
      },
    });
  }

  preview() {
    const {
      name: title,
      logo,
      categories,
    } = this.state2Config();
    return (
      <Modal
        title="Preview"
        visible={this.state.isPreviewing}
        destroyOnClose
        width="100%"
        footer={null}
        onCancel={() => this.setState({ isPreviewing: false })}
      >
        <AppFrame
          title={title}
          logo={logo}
          categories={categories}
          defaultStory={_.head(categories).id}
          componentRegistry={ComponentRegistry}
        />
      </Modal>
    );
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
      name,
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
      <div>
        <Layout>
          <Header
            style={{
              paddingTop: '20px',
              background: 'white',
            }}
          >
            <Button
              type="primary"
              onClick={() => this.setState({ isPreviewing: true })}
            >
              Preview
            </Button>
          </Header>
          <Content>
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
                    value={name}
                    onChange={event => this.setState({ name: event.target.value })}
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
          </Content>
        </Layout>
        {this.preview()}
      </div>
    );
  }
}
