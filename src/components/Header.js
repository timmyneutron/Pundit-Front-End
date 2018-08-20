import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import * as actions from "../actions"

class Header extends Component {
    showLogin = () => {
        this.props.dispatch(actions.showLogin())
    }

    logout = () => {
        this.props.dispatch(actions.logout())
    }
    
    render() {
        return (
    		<Link to="/">
        	   <div className="fixed-top">
        	       <Row>
                        <Col sm={8}>
                        	<h1 className="site-title" href="/">Pundit</h1>
                        	<h4 className="site-subtitle">"Time flies like an arrow. Fruit flies like a banana."</h4>
                        </Col>
                        { this.props.currentUser ?
                            <Col className="login-button-box" sm={4}>
                                <h4 className="logged-in-user">Logged in as {this.props.currentUser}</h4>
                                <Button onClick={this.logout} className="ml-2">log out</Button>
                            </Col>
                            :
                            <Col className="login-button-box" sm={4}>
                                <Button className="mr-2">sign up</Button>
                                <Button onClick={this.showLogin}>log in</Button>
                            </Col>
                        }
                    </Row>
                </div>
            </Link>
    	)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Header)