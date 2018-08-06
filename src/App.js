import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FrontPage from "./components/FrontPage"
import PostDetail from "./components/PostDetail"
import './App.css'

class App extends Component {
  renderFooter = () => {
    if (this.props.posts.length === 0) {
      return false
    }

    if (this.props.posts.length === 1 && this.props.comments.length === 0) {
      return false
    }

    return true
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/:category" component={FrontPage} />
          <Route exact path="/:category/:id" component={PostDetail} />
        </Switch>
        { this.renderFooter() && <Footer /> }
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
