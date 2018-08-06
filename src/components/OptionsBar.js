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

  filterPosts = (category) => {
    const qs = window.location.search === "" ? "" : `${window.location.search}`
    window.location.href = `${window.location.origin}/${category}${qs}`
  }

  sortPosts = (option) => {
    const qs = queryString.stringify({ sort: option })
    window.location.search = `?${qs}`
  }

  render() {
    const parsed = queryString.parse(window.location.search)
    const sortOptions = ["voteScore", "title", "author"]

    return (
      <Navbar dark expand="sm">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
          	{this.props.categories.map(category => (
              <NavItem key={category.name}>
                <NavLink onClick={() => this.filterPosts(category.path)}>{category.name}</NavLink>
              </NavItem>
          	))}
            <NavItem>
              <NavLink onClick={() => this.props.addPost()}>add post</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                sort by...
              </DropdownToggle>
              <DropdownMenu>
              { sortOptions.map(option => (
                (option === parsed.sort || option === "voteScore" && !parsed.sort) ?
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.categories
	}
}

export default connect(mapStateToProps)(OptionsBar)