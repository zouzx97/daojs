import incomeCustomers from './income-customers.yaml';
import oneForAll from './one-for-all.yaml';
import customerContent from './customer-content.yaml';

export default {
  name: '运营分析',
  routeName: 'appframe',
  id: 'a3bc8bfa-ae04-5e58-87f2-d771e05b2391',
  description: '多维度了解餐厅运营情况',
  coverImage: '/img/sodexo.png',
  logoImage: '/img/demo.png',
  frameType: 'AppFrame',
  categories: [{
    id: '9082ae1f-9285-5ca0-9893-5ce56716be99',
    name: 'Default stories',
    stories: [
      incomeCustomers,
      oneForAll,
      customerContent,
    ],
  }],
};
