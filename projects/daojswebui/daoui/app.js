import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ComponentDetail from './component/componentDetailHoC';
import RegistryStudio from './component/registryStudio';
import Home from './component/home';
import Advanced from './component/advanced';
import Frame from './component/frame';
import TemplateEditor from './component/template-editor';
import TemplatesIndex from './component/templates-index';

function HomeHoC() {
  return (
    <Home registryLink="/registry" />
  );
}

export default function App() {
  return (
    <HashRouter>
      <Frame>
        <Route exact path="/" component={HomeHoC} />
        <Route path="/registry/:componentName*" component={RegistryStudio} />
        <Route path="/detail/:componentName*" component={ComponentDetail} />
        <Route path="/advanced" component={Advanced} />
        <Route path="/templates" component={TemplatesIndex} />
        <Route path="/editor/:frameType/:id" component={TemplateEditor} />
      </Frame>
    </HashRouter>
  );
}
