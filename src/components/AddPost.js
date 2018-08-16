import React, { Component } from "react"
import { connect } from "react-redux"
import { FormGroup, Input, ButtonGroup, Button } from "reactstrap"
import * as actions from "../actions"

class AddPost extends Component {
	state = {
		formTitle: "",
		formAuthor: "",
		formCategory: "",
		formBody: "",
		showWarning: false
	}
	
	submitForm = () => {
		if (this.state.formTitle === "" || this.state.formAuthor === "" || this.state.formCategory === "" || this.state.formBody === "") {
			this.setState({ showWarning: true })
			return
		}

		this.props.dispatch(actions.addPost(this.state.formTitle, this.state.formBody, this.state.formAuthor, this.state.formCategory))
		this.props.clearForm()
	}

	render() {
		return (
			<div className="post-card">
				<h4>Add A Post</h4>
				{ this.state.showWarning && <h5 className="form-warning">You didn't fill out the whole form!</h5> }
				<FormGroup>
					<Input
						type="text"
						placeholder="Title..."
						value={this.state.formTitle}
						onChange={(event) => this.setState({ formTitle: event.target.value })}
					/>
					<Input
						type="text"
						placeholder="Author..."
						value={this.state.formAuthor}
						onChange={(event) => this.setState({ formAuthor: event.target.value })}
					/>
					<Input
						type="select"
						defaultValue="Category..."
						onChange={(event) => this.setState({ formCategory: event.target.value })}
					>
						<option disabled>Category...</option>
						{ this.props.categories.map(category => (
							<option key={category.name}>{category.path}</option>
						))}
					</Input>
					<Input
						type="textarea"
						placeholder="Body..."
						value={this.state.formBody}
						onChange={(event) => this.setState({ formBody: event.target.value })}
					/>
					<ButtonGroup>
						<Button onClick={this.submitForm}>submit</Button>
						<Button onClick={this.props.clearForm}>cancel</Button>
					</ButtonGroup>
				</FormGroup>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.categories.filter(category => category.name !== "all")
	}
}

export default connect(mapStateToProps)(AddPost)