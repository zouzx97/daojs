import uuidv4 from 'uuid/v4';

export function getTopDishes() {
  return {
    recommendations: [{
      id: uuidv4(),
      taste: '甜味',
      price: 10,
      name: '原味松饼',
      img: './img/pie.jpg',
      tag: '补充能量',
    }, {
      id: uuidv4(),
      taste: '酸甜味',
      price: 12,
      name: '清爽时蔬沙拉',
      img: './img/salad.jpg',
      tag: '营养丰富',
    }, {
      id: uuidv4(),
      taste: '家常味',
      price: 10,
      name: '缤纷下饭菜',
      img: './img/xiafan.jpg',
      tag: '开胃下饭',
    }, {
      id: uuidv4(),
      taste: '酸辣味',
      price: 12,
      name: '酸辣鲫鱼',
      img: './img/fish.jpg',
      tag: '营养丰富',
    }, {
      id: uuidv4(),
      taste: '家常味',
      price: 10,
      name: '宫保鸡丁',
      img: './img/chicken.jpg',
      tag: '优质蛋白',
    }],
  };
}
