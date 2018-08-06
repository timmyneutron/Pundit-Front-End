import React from "react"
import { Link } from "react-router-dom"

export default function Header(props) {
	return (
		<Link to="/">
    	<div className="fixed-header">
      	<h1 className="site-title">Pundit</h1>
      	<h4 className="site-subtitle">"Time flies like an arrow. Fruit flies like a banana."</h4>
    	</div>
    </Link>
	)
}