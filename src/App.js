import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FrontPage from "./components/FrontPage"
import PostDetail from "./components/PostDetail"
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/:category" component={FrontPage} />
          <Route exact path="/:category/:id" component={PostDetail} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
