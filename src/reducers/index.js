import { combineReducers } from 'redux'
import * as actions from "../actions"

function categories(state=[], action) {
	switch (action.type) {

		case actions.RECEIVE_CATEGORIES :
			return action.categories

		default :
			return state
	}
}

function posts(state=[], action) {
	let newState, ind

	switch (action.type) {
		case actions.RECEIVE_POSTS :
			return action.posts

		case actions.RECEIVE_SINGLE_POST :
			newState = state.slice(0)
			ind = newState.findIndex(post => post._id === action.post._id)
			if (ind === -1) {
				newState.push(action.post)
			} else {
				newState[ind] = action.post
			}
			return newState

		case actions.DELETE_POST :
			newState = state.slice(0)
			return newState.filter(post => post._id !== action._id)

		default :
			return state
	}
}

function comments(state=[], action) {
	let newState

	switch (action.type) {

		case actions.RECEIVE_COMMENTS :
			return action.comments

		case actions.RECEIVE_SINGLE_COMMENT :
			newState = state.slice(0)
			const ind = newState.findIndex(comment => comment._id === action.comment._id)
			if (ind === -1) {
				newState.push(action.comment)
			} else {
				newState[ind] = action.comment
			}
			return newState

		case actions.DELETE_COMMENT :
			newState = state.slice(0)
			return newState.filter(comment => comment._id !== action._id)

		default :
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})