import React, { Component } from "react"
import { connect } from "react-redux"
import { Container, Button, ButtonGroup, FormGroup, Input } from "reactstrap"
import Comment from "./Comment"
import AddComment from "./AddComment"
import * as actions from "../actions"
import { sort } from "../utils"

class PostDetail extends Component {
	state = {
		editPost: false,
		addComment: false,
		formTitle: "",
		formBody: "",
		formAuthor: "",
		formCategory: ""
	}

	componentDidMount = () => {
		this.props.dispatch(actions.fetchSinglePost(this.props.match.params.id))
		this.props.dispatch(actions.fetchComments(this.props.match.params.id))
	}

	vote = (option) => {
		this.props.dispatch(actions.votePost(this.props.match.params.id, option))
	}

	deletePost = () => {
		this.props.dispatch(actions.deletePost(this.props.match.params.id))
		window.location.href = window.location.origin
	}

	submitForm = () => {
		this.props.dispatch(actions.editPost(this.props.match.params.id, this.state.formTitle, this.state.formBody))
		this.setState({ editPost: false })
	}

	render() {
		const { title, body, voteScore, author } = this.props
		return (
			<Container fluid className="post-detail-container">
				<div className="post-detail-card">
					{ this.state.editPost ?
						<FormGroup>
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
							/>
							<h5>by {author}</h5>
							<h5>score: {voteScore}</h5>
							<ButtonGroup>
								<Button onClick={this.submitForm}>submit</Button>
								<Button onClick={() => this.setState({ editPost: false })}>cancel</Button>
							</ButtonGroup>
						</FormGroup>
						:
						<div>
							<h3 className="post-detail-title">{title}</h3>
							<p className="post-detail-body">{body}</p>
							<h5>by {author}</h5>
							<h5>score: {voteScore}</h5>
							<ButtonGroup>
								<Button onClick={() => this.vote("upVote")}>↑</Button>
								<Button onClick={() => this.vote("downVote")}>↓</Button>
							</ButtonGroup>
							<ButtonGroup className="ml-4">
								<Button onClick={() => this.setState({ addComment: true })}>comment</Button>
								<Button onClick={() => this.setState({ editPost: true })}>edit</Button>
								<Button onClick={this.deletePost}>delete</Button>
							</ButtonGroup>
						</div>
					}
				</div>
				<div className="comment-list">
					{ (this.props.comments.length > 0 || this.state.addComment) && <h4 className="comment-list-title">Comments</h4>}
					{ this.state.addComment && <AddComment parentId={this.props.id} clearForm={() => this.setState({ addComment: false })}/>}
					{this.props.comments.map(comment => (
						<Comment key={comment.id} {...comment} />
					))}
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const post = state.posts.find(post => post.id === ownProps.match.params.id)
	let comments = state.comments.filter(comment => !comment.deleted)
	comments = sort(comments)
	return {
		...post,
		comments
	}
}

export default connect(mapStateToProps)(PostDetail)