import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ActionDocument from './Action';
import ListDocument from './List';
import ViewDocument from './View';

const Document = () => (
  <Switch>
    <Route path="/document/create" exact component={ActionDocument} />
    <Route path="/document/edit/:id" exact component={ActionDocument} />
    <Route path="/document/view/:id" exact component={ViewDocument} />
    <Route component={ListDocument} />
  </Switch>
);

export default Document;
