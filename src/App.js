import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
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
          <Route exact path="/:category/:_id" component={PostDetail} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

export default withRouter(connect(mapStateToProps)(App));
