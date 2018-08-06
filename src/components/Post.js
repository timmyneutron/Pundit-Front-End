import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button, ButtonGroup } from "reactstrap"
import * as actions from "../actions"

class Post extends Component {
	vote = (event, option) => {
		event.preventDefault()
		if (option === "up") {
			this.props.dispatch(actions.votePost(this.props.id, "upVote"))
		} else {
			this.props.dispatch(actions.votePost(this.props.id, "downVote"))
		}
	}

	render() {
		const { id, category, title, author, voteScore, commentCount } = this.props
		return (
			<Link to={`/${category}/${id}`} className="post">
				<div className="post-card">
					<h4>{title}</h4>
					<h5>by {author}</h5>
					<h5>voteScore: {voteScore}</h5>
					<h5>comments: {commentCount}</h5>
					<ButtonGroup>
						<Button onClick={event => this.vote(event, "up")}>↑</Button>
						<Button onClick={event => this.vote(event, "down")}>↓</Button>
					</ButtonGroup>
				</div>
			</Link>
		)
	}
}

export default connect()(Post)