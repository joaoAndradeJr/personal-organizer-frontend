import React from 'react';
import  { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
// import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      {/* <Route path="/edit" component={ EditTask } /> */}
      <Route path='*' component={ NotFound } />
    </Switch>
  );
}

export default App;
