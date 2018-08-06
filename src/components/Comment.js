import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, ButtonGroup, FormGroup, Input } from "reactstrap"
import * as actions from "../actions"

class Comment extends Component {
	state = {
		editComment: false,
		formBody: this.props.body
	}

	vote = (event, option) => {
		this.props.dispatch(actions.voteComment(this.props.id, option))
	}

	submitForm = () => {
		this.props.dispatch(actions.editComment(this.props.id, this.state.formBody))
		this.setState({ editComment: false, formBody: ""})
	}

	deleteComment = () => {
		console.log("foo")
		this.props.dispatch(actions.deleteComment(this.props.id))
	}

	render() {
		const { body, author, voteScore } = this.props
		return (
			<div className="comment-card">
				{ this.state.editComment ?
					<FormGroup>
						<h5 className="comment-author">{author} says:</h5>
						<Input
							type="textarea"
							placeholder={body}
							value={this.state.formBody}
							onChange={(event) => this.setState({ formBody: event.target.value })}
						/>
						<p className="comment-score">score: {voteScore}</p>
						<ButtonGroup>
							<Button size="sm" onClick={this.submitForm}>submit</Button>
							<Button size="sm" onClick={() => this.setState({ editComment: false, formBody: "" })}>cancel</Button>
						</ButtonGroup>
					</FormGroup>
					:
					<div>
						<h5 className="comment-author">{author} says:</h5>
						<p className="comment-body">{body}</p>
						<p className="comment-score">score: {voteScore}</p>
						<ButtonGroup>
							<Button size="sm" onClick={event => this.vote(event, "upVote")}>↑</Button>
							<Button size="sm" onClick={event => this.vote(event, "downVote")}>↓</Button>
						</ButtonGroup>
						<ButtonGroup className="ml-4">
							<Button size="sm" onClick={() => this.setState({ editComment: true })}>edit</Button>
							<Button size="sm" onClick={this.deleteComment}>delete</Button>
						</ButtonGroup>
					</div>
				}
			</div>
		)
	}
}

export default connect()(Comment)