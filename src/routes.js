import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Tv from './pages/Tv';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Movies} exact />
      <Route path="/tv" component={Tv} exact />
    </Switch>
  );
}

export default Routes;
