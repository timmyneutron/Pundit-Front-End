import * as actions from "../actions"
import reducer from "./index"

describe("reducers", () => {

	const defaultState = {
		categories: [],
		posts: [],
		comments: []
	}

	it("returns default state", () => {
		expect(reducer(undefined, {})).toEqual(defaultState)
	})

	it("updates state with new categories", () => {
		const mockCategories = [
	    {
	      name: 'all',
	      path: ''
	    },
	    {
	      name: 'puns',
	      path: 'puns'
	    },
	    {
	      name: 'dad jokes',
	      path: 'dadjokes'
	    },
	    {
	      name: 'word play',
	      path: 'wordplay'
	    }
		]

		const mockAction = {
			type: actions.RECEIVE_CATEGORIES,
			categories: mockCategories
		}

		expect(reducer(defaultState, mockAction)).toEqual({
			categories: mockCategories,
			posts: [],
			comments: []
		})
	})

	it("updates state with new posts", () => {
		const mockPosts = [
			{
		    id: '8xf0y6ziyjabvozdd253nd',
		    timestamp: 1524621132000,
		    title: 'Did you hear about the cross-eyed teacher?',
		    body: 'She had trouble controlling her pupils.',
		    author: 'timmyneutron',
		    category: 'puns',
		    voteScore: 30,
		    deleted: false,
		    commentCount: 2
	  	},
	  	{
		    id: '6ni6ok3ym7mf1p33lnez',
		    timestamp: 1524666009000,
		    title: "Why couldn't the bike stand up?",
		    body: 'Because it was two-tired.',
		    author: 'dawniedarko',
		    category: 'puns',
		    voteScore: 25,
		    deleted: false,
		    commentCount: 2
  		}
  	]

		const mockAction = {
			type: actions.RECEIVE_POSTS,
			posts: mockPosts
		}

		expect(reducer(defaultState, mockAction)).toEqual({
			categories: [],
			posts: mockPosts,
			comments: []
		})
	})

	it("updates state with new comments", () => {
		const mockComments = [
			{
		    id: '894tuq4ut84ut8v4t8wun89g',
		    parentId: "8xf0y6ziyjabvozdd253nd",
		    timestamp: 1524668353000,
		    body: 'Groan!',
		    author: 'dawniedarko',
		    voteScore: 6,
		    deleted: false,
		    parentDeleted: false
  		},
			{
		    id: '8tu4bsun805n8un48ve89',
		    parentId: "8xf0y6ziyjabvozdd253nd",
		    timestamp: 1524681191000,
		    body: 'So bad! And so good!',
		    author: 'willyshakes',
		    voteScore: 2,
		    deleted: false,
		    parentDeleted: false
  		}
  	]

		const mockAction = {
			type: actions.RECEIVE_COMMENTS,
			comments: mockComments
		}

		expect(reducer(defaultState, mockAction)).toEqual({
			categories: [],
			posts: [],
			comments: mockComments
		})
	})
})