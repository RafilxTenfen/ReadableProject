import React, { Component } from 'react';
import '../App.css';
import PostList from './PostControl'
import Categories from './Categories'
import { Switch, Route, withRouter } from 'react-router-dom'

class App extends Component {

  render() {


    return (
      <div className="App">
          <Switch>
            <Route path="/" component={Categories}/>
          </Switch>
            <Route component={PostList} />
      </div>
    );
  }
}

export default withRouter(App)
