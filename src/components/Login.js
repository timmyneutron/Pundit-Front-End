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
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.loginError === false) {
			this.hideForm()
		}
	}

	render() {
		return (
			<div className="post-card">
				<h4>Login</h4>
				{ this.props.loginError && <h5 className="form-warning">Invalid username/password</h5> }
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

const mapStateToProps = (state, ownProps) => {
	return {
		loginError: state.loginError
	}
}

export default connect(mapStateToProps)(Login)