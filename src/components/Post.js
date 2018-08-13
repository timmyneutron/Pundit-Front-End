import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Button, ButtonGroup, FormGroup, Input } from "reactstrap"
import * as actions from "../actions"

class Post extends Component {
	state = {
		editPost: false,
		formTitle: "",
		formBody: ""
	}

	vote = (event, option) => {
		event.preventDefault()
		if (option === "up") {
			this.props.dispatch(actions.votePost(this.props._id, "upVote"))
		} else {
			this.props.dispatch(actions.votePost(this.props._id, "downVote"))
		}
	}

	editPost = (event) => {
		event.preventDefault()
		this.setState({
			editPost: true,
			formTitle: this.props.title,
			formBody: this.props.body
		})
	}

	cancelEdit = () => {
		this.setState({ editPost: false })
	}

	deletePost = (event) => {
		event.preventDefault()
		this.props.dispatch(actions.deletePost(this.props._id))
		window.location.href = window.location.href
	}

	submitForm = () => {
		this.props.dispatch(actions.editPost(this.props._id, this.state.formTitle, this.state.formBody))
		this.setState({ editPost: false })
	}

	render() {
		const { _id, category, title, author, voteScore, commentCount, body } = this.props
		return (
			<div>
				{ this.state.editPost ?
					<div className="post-card">
						<FormGroup>
							<h4>Edit Post</h4>
							<Input
								type="text"
								placeholder={title}
								value={this.state.formTitle}
								onChange={event => this.setState({ formTitle: event.target.value })}
							/>
							<Input
								type="textarea"
								placeholder={body}
								value={this.state.formBody}
								onChange={event => this.setState({ formBody: event.target.value })}
							/>						</FormGroup>
						<h5>by {author}</h5>
						<h5>voteScore: {voteScore}</h5>
						<h5>comments: {commentCount}</h5>
						<ButtonGroup>
							<Button onClick={this.submitForm}>submit</Button>
							<Button onClick={this.cancelEdit}>cancel</Button>
						</ButtonGroup>
					</div>		
					:
					<Link to={`/${category}/${_id}`} className="post">
						<div className="post-card">
							<h4>{title}</h4>
							<h5>by {author}</h5>
							<h5>voteScore: {voteScore}</h5>
							<h5>comments: {commentCount}</h5>
							<ButtonGroup>
								<Button onClick={event => this.vote(event, "up")}>↑</Button>
								<Button onClick={event => this.vote(event, "down")}>↓</Button>
							</ButtonGroup>
							<ButtonGroup className="ml-4">
								<Button onClick={this.editPost}>edit</Button>
								<Button onClick={this.deletePost}>delete</Button>
							</ButtonGroup>
						</div>
					</Link>
				}
			</div>
		)
	}
}

export default connect()(Post)