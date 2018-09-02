import React from 'react';
import { connect } from "react-redux"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import * as actions from "../actions"

const queryString = require("query-string")

class OptionsBar extends React.Component {
  state = {
  	isOpen: false
  }

  componentDidMount = () => {
  	this.props.dispatch(actions.fetchCategories())
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  filterPosts = (pathname = '/') => {
    const { search } = this.props.history.location
    this.props.history.push({ pathname, search })
  }

  sortPosts = (sortOption) => {
    this.props.history.push({ search: queryString.stringify({ sort: sortOption })})
  }

  render() {
    const parsed = queryString.parse(window.location.search)
    const sortOptions = ["voteScore", "title", "author"]

    return (
      <div>
        { this.props.categories.length > 0 &&
          <Navbar dark expand="sm">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto mr-auto" navbar>
                <NavItem>
                  <NavLink id="options-bar-link" onClick={() => this.filterPosts()}>all</NavLink>
                </NavItem>
              	{this.props.categories.map(category => (
                  <NavItem key={category.name}>
                    <NavLink id="options-bar-link" onClick={() => this.filterPosts(category.path)}>{category.name}</NavLink>
                  </NavItem>
              	))}
                <NavItem>
                  <NavLink id="options-bar-link" onClick={() => this.props.addPost()}>add post</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="options-bar-link">
                    sort by...
                  </DropdownToggle>
                  <DropdownMenu>
                  { sortOptions.map(option => (
                    (option === parsed.sort || (option === "voteScore" && !parsed.sort)) ?
                    <DropdownItem key={option} className="active" onClick={() => this.sortPosts(option)}>
                      {option}
                    </DropdownItem>
                    :
                    <DropdownItem key={option} onClick={() => this.sortPosts(option)}>
                      {option}
                    </DropdownItem>
                  ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.categories
	}
}

export default connect(mapStateToProps)(OptionsBar)