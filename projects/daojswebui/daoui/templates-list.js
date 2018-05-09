import {
  Fundamentals,
  AIOperations,
  DefaultStories,
  CustomStories,
} from '../ui/stories/index';

const examples = [
  {
    name: 'sodexo',
    description: '描述sodexo项目',
    coverImage: '/img/sodexo.png',
    logoImage: '/img/sodexo.logo.png',
    categories: [{
      id: '35a62e19-4b1b-4541-85aa-aa86b56c44ae',
      name: '基础面板',
      stories: Fundamentals,
    }, {
      id: 'b115caf6-620f-4a07-9cff-7f813d7e2c5f',
      name: '智能运营助手',
      stories: AIOperations,
    }],
  },
  {
    name: 'demo',
    description: 'demo项目',
    coverImage: '/img/demo.png',
    logoImage: '/img/demo.png',
    categories: [{
      id: '35a62e19-4b1b-4541-85aa-aa86b56c44ae',
      name: 'Default stories',
      stories: DefaultStories,
    }, {
      id: '0dabd0a2-1124-54a3-98dc-685aa110d129',
      name: 'Custom stories',
      stories: CustomStories,
      isStoryEditable: true,
    }],
  },
];

export default examples;
