import React, { Component } from "react"
import { connect } from "react-redux"
import { Container } from "reactstrap"
import OptionsBar from "./OptionsBar"
import Post from "./Post"
import AddPost from "./AddPost"
import Footer from "./Footer"
import * as actions from "../actions"
import { sort } from "../utils"

const queryString = require('query-string')

class FrontPage extends Component {
	state = {
		addPost: false
	}

	componentDidMount = (prevProps) => {
		this.getPosts()
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.location.pathname !== this.props.location.pathname ||
			  prevProps.location.search !== this.props.location.search) {
				this.getPosts()
		}
	}

	getPosts = () => {
		if (this.props.match.params.category) {
			this.props.dispatch(actions.fetchCategoryPosts(this.props.match.params.category))
		} else {
			this.props.dispatch(actions.fetchAllPosts())
		}
	}

	render() {
		const parsedQueryString = queryString.parse(this.props.location.search)
		const posts = sort(this.props.posts, parsedQueryString.sort)

		return (
			<Container fluid className="front-page-container">
				<OptionsBar
					history={this.props.history}
					addPost={() => this.setState({ addPost: true })}
				/>
				{this.state.addPost && <AddPost clearForm={() => this.setState({ addPost: false })} />}
				{posts.map(post => (
					<Post key={post._id} {...post} />
				))}
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.categories,
		posts: state.posts
	}
}

export default connect(mapStateToProps)(FrontPage)