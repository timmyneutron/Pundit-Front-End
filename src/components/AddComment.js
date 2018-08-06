import React, { Component } from "react"
import { connect } from "react-redux"
import { FormGroup, Input, ButtonGroup, Button } from "reactstrap"
import * as actions from "../actions"

class AddComment extends Component {
	state = {
		formBody: "",
		formAuthor: "",
		showWarning: false
	}

	submitForm = () => {
		if (this.state.formBody === "" || this.state.formAuthor === "") {
			this.setState({ showWarning: true })
			return
		}
		
		this.props.dispatch(actions.addComment(this.state.formBody, this.state.formAuthor, this.props.parentId))
		this.props.clearForm()
	}

	render() {
		return (
			<div className="comment-card">
				<h5>Add A Comment</h5>
				{ this.state.showWarning && <h6 className="form-warning">You didn't fill out the whole form!</h6>}
				<FormGroup>
					<Input
						type="text"
						placeholder="Author..."
						value={this.state.formAuthor}
						onChange={(event) => this.setState({ formAuthor: event.target.value })}
					/>
					<Input
						type="text"
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

export default connect()(AddComment)