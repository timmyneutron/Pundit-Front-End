import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as utils from "../utils"
import * as actions from "./index"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("async actions", () => {
	it("fetches categories and dispatches action", () => {
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

		fetchMock.getOnce(`${utils.api}/categories`, {
			body: mockCategories,
			headers: { 'content-type': 'application/json' }
		})

		const expectedActions = [
			{
				type: actions.RECEIVE_CATEGORIES,
				categories: mockCategories
			}
		]

		const store = mockStore({ categories: [] })

		return store.dispatch(actions.fetchCategories()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it("fetches posts and dispatches action", () => {
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

  	fetchMock.getOnce(`${utils.api}/posts`, {
			body: mockPosts,
			headers: { 'content-type': 'application/json' }
		})

		const expectedActions = [
			{
				type: actions.RECEIVE_POSTS,
				posts: mockPosts
			}
		]

		const store = mockStore({ posts: [] })

		return store.dispatch(actions.fetchAllPosts()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it("fetches comments and dispatches action", () => {
		const mockParentId = "8xf0y6ziyjabvozdd253nd"
		const mockComments = [
			{
		    id: '894tuq4ut84ut8v4t8wun89g',
		    parentId: mockParentId,
		    timestamp: 1524668353000,
		    body: 'Groan!',
		    author: 'dawniedarko',
		    voteScore: 6,
		    deleted: false,
		    parentDeleted: false
  		},
			{
		    id: '8tu4bsun805n8un48ve89',
		    parentId: mockParentId,
		    timestamp: 1524681191000,
		    body: 'So bad! And so good!',
		    author: 'willyshakes',
		    voteScore: 2,
		    deleted: false,
		    parentDeleted: false
  		}
  	]

  	fetchMock.getOnce(`${utils.api}/posts/${mockParentId}/comments`, {
			body: mockComments,
			headers: { 'content-type': 'application/json' }
		})

		const expectedActions = [
			{
				type: actions.RECEIVE_COMMENTS,
				comments: mockComments
			}
		]

		const store = mockStore({ comments: [] })

		return store.dispatch(actions.fetchComments(mockParentId)).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})