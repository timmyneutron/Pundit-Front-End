import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Input, ButtonGroup, Button } from 'reactstrap'
import * as actions from "../actions"

class Login extends Component {
	state = {
		formUsername: "",
		formPassword: ""
	}

	hideForm = () => {
		this.setState({ formUsername: "", formPassword: ""})
		this.props.dispatch(actions.hideLogin())
	}

	submitForm = () => {
		const { formUsername, formPassword } = this.state
		this.props.dispatch(actions.postLogin(formUsername, formPassword))
		this.props.dispatch(actions.hideLogin())
	}

	render() {
		return (
			<div className="post-card">
				<h4>Login</h4>
				<FormGroup>
					<Input
						type="text"
						placeholder="Username..."
						value={this.state.formUsername}
						onChange={(event) => this.setState({ formUsername: event.target.value })}
					/>
					<Input
						type="password"
						placeholder="Password..."
						value={this.state.formPassword}
						onChange={(event) => this.setState({ formPassword: event.target.value })}
					/>
					<ButtonGroup>
						<Button onClick={this.submitForm}>log in</Button>
						<Button onClick={this.hideForm}>cancel</Button>
					</ButtonGroup>
				</FormGroup>
			</div>
		)
	}
}

export default connect()(Login)