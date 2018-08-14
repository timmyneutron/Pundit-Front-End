import React from "react"
import { Link } from "react-router-dom"
import { Row, Col } from "reactstrap"

export default function Header(props) {
    return (
		<Link to="/">
    	   <div className="fixed-top">
    	       <Row>
                    <Col xs={12}>
                    	<h1 className="site-title" href="/">Pundit</h1>
                    	<h4 className="site-subtitle">"Time flies like an arrow. Fruit flies like a banana."</h4>
                    </Col>
                </Row>
            </div>
        </Link>
	)
}

