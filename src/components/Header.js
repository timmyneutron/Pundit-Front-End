import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Row, Col, Button } from "reactstrap"
import * as actions from "../actions"

class Header extends Component {
    showLogin = () => {
        this.props.dispatch(actions.showLogin())
    }
    
    render() {
        return (
    		<Link to="/">
        	   <div className="fixed-top">
        	       <Row>
                        <Col sm={9}>
                        	<h1 className="site-title" href="/">Pundit</h1>
                        	<h4 className="site-subtitle">"Time flies like an arrow. Fruit flies like a banana."</h4>
                        </Col>
                        <Col sm={3} id='balls'>
                            <Button className="mr-2">Sign Up</Button>
                            <Button onClick={this.showLogin}>Log In</Button>
                        </Col>
                    </Row>
                </div>
            </Link>
    	)
    }
}

export default connect()(Header)