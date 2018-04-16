import _ from 'lodash';
import React from 'react';
import { Layout, Menu, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import Storyboard from './storyboard';
import CustomStoryEditor from './custom-story';

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
  const { stories, isStoryEditable } = category;
  return (
    <SubMenu key={category.id} title={reunderCategorySubMenuTitle(category)} >
      { isStoryEditable ? (
        <Item key="add-customer-story">
          <Icon type="plus-circle" />
          <span>添加</span>
        </Item>) : null }
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

    this.state = { selectedStory, selectedCategory, isCustomStoryEditorVisible: false };

    this.discardCustomStoryEditing = this.discardCustomStoryEditing.bind(this);
    this.showCustomStoryEditor = this.showCustomStoryEditor.bind(this);
    this.commitNewCustomStory = this.commitNewCustomStory.bind(this);
  }

  showCustomStoryEditor() {
    this.setState({ isCustomStoryEditorVisible: true });
  }

  discardCustomStoryEditing() {
    this.setState({ isCustomStoryEditorVisible: false });
  }

  commitNewCustomStory(storyJson) {
    try {
      const newStory = JSON.parse(storyJson);
      const existingStoriesIndexesJSON = localStorage.getItem('customeStories.index');
      const existingStoriesIndexes = _.isEmpty(existingStoriesIndexesJSON) ?
        [] : JSON.parse(existingStoriesIndexesJSON);

      localStorage.setItem('customeStories.index', JSON.stringify(_.uniq([newStory.id, ...existingStoriesIndexes])));
      localStorage.setItem(`customeStories.${newStory.id}`, storyJson);

      this.setState({ isCustomStoryEditorVisible: false });

      window.location.reload();
    } catch (error) {
      alert('你的json格式似乎有问题，请打开debug tool查看详细信息');
      window.console.log(error);
    }
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
              onSelect={({ key }) => {
                if (key === 'add-customer-story') {
                  this.showCustomStoryEditor();
                } else {
                  this.setState({ selectedStory: key });
                }
              }}
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
        <CustomStoryEditor
          isCustomStoryEditorVisible={this.state.isCustomStoryEditorVisible}
          discardCustomStoryEditing={this.discardCustomStoryEditing}
          commitNewCustomStory={this.commitNewCustomStory}
        />
      </Layout>
    );
  }
}
