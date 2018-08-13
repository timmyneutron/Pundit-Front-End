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

	componentDidMount = () => {
		const { category } = this.props.match.params
		if (category) {
			this.props.dispatch(actions.fetchCategoryPosts(category))
		} else {
			this.props.dispatch(actions.fetchAllPosts())	
		}
	}

	render() {
		return (
			<Container fluid className="front-page-container">
				<OptionsBar addPost={() => this.setState({ addPost: true })} />
				{this.state.addPost && <AddPost clearForm={() => this.setState({ addPost: false })} />}
				{this.props.posts.map(post => (
					<Post key={post._id} {...post} />
				))}
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let posts = state.posts.filter(post => !post.deleted)

	const parsed = queryString.parse(ownProps.location.search)
	const filterCategory = ownProps.match.params.category

	if (filterCategory) {
		posts = posts.filter(post => post.category === filterCategory)
	}
	
	return {
		categories: state.categories,
		posts: sort(posts, parsed.sort)
	}
}

export default connect(mapStateToProps)(FrontPage)