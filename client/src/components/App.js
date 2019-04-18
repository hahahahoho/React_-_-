import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// import List from './List';
// import Login from './Login';
import {Main, Login, Join, BoardList, BoardView, BoardUpdate} from 'pages';
import Header from 'components/Header'

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <h2>템플릿 적용 전</h2>
        <Header></Header>
        <Route exact path='/' component={Main}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/Join' component={Join}/>
        <Route exact path='/BoardView' component={BoardView}/>
        <Route exact path='/BoardUpdate' component={BoardUpdate}/>
      </React.Fragment>
    );
  }
}

export default App;
