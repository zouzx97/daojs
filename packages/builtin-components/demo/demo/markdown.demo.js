import React from 'react';
import builtinComponents from '../../src/index';

const {
  Markdown,
} = builtinComponents;

export default function MarkdownDemo() {
  return (
    <Markdown value="### 促销方案推荐" />
  );
}
