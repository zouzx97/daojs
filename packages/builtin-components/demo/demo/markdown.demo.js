import React from 'react';
import builtinComponents from '../../src/index';

const {
  Markdown,
} = builtinComponents;

export default function MarkdownDemo() {
  return (
    <Markdown value="
# 测试标题
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6


# 列表
- （前面有空格）无序列表
* 无序列表


1. 有序列表
1. （前面有空格）有序列表


# 字体
**粗体**
*斜体*
~~删除线~~


> 引用


# todo list
- [ ]todo list
- [ ] bbs 维护
- [ ] Desktop 发布新版
    - [x] Markdown编辑器添加Todo list
    - [x] 修复白屏问题
    - [ ] 修复issue3
- [ ] Leanote 维护
    - [ ] 修复issue4


# code


```js
  alert('hello')
```"
    />
  );
}
