import * as utils from "../utils"

// action type strings
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_SINGLE_POST = "RECEIVE_SINGLE_POST"
export const DELETE_POST = "DELETE_POST"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const RECEIVE_SINGLE_COMMENT = "RECEIVE_SINGLE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

// updates state with new categories list
export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

// gets categories list from the API
export const fetchCategories = () => (dispatch) =>
  utils.getCategories()
  .then(categories => dispatch(receiveCategories(categories)));

// updates state with new posts list
export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

// updates state with a single new post
export const receiveSinglePost = (post) => {
  return {
    type: RECEIVE_SINGLE_POST,
    post
  }
}

// gets all posts from the API
export const fetchAllPosts = () => (dispatch) =>
  utils.getAllPosts()
  .then(posts => dispatch(receivePosts(posts)));

// gets posts for a category from the API
export const fetchCategoryPosts = (category) => (dispatch) =>
  utils.getCategoryPosts(category)
  .then(posts => dispatch(receivePosts(posts)))

// adds a post
export const addPost = (title, body, author, category) => (dispatch) =>
  utils.addPost(title, body, author, category)
  .then(post => dispatch(receiveSinglePost(post)))

// gets a single post from the API
export const fetchSinglePost = (_id) => (dispatch) =>
  utils.getPost(_id)
  .then(post => dispatch(receiveSinglePost(post)))

// votes on a post
export const votePost = (_id, option) => (dispatch) =>
  utils.votePost(_id, option)
  .then(post => dispatch(receiveSinglePost(post)))

// edits a post
export const editPost = (_id, title, body) => (dispatch) =>
  utils.editPost(_id, title, body)
  .then(post => dispatch(receiveSinglePost(post)))

// deletes a post locally
const deletePostLocal = (_id) => {
  return {
    type: DELETE_POST,
    _id
  }
}

// deletes a post on the API
export const deletePost = (_id) => (dispatch) =>
  utils.deletePost(_id)
  .then(response => dispatch(deletePostLocal(_id)))

// updates the state with new comments list
export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

// updates state with a single new comment
export const receiveSingleComment = (comment) => {
  return {
    type: RECEIVE_SINGLE_COMMENT,
    comment
  }
}

// gets comments for a post from the API
export const fetchComments = (postId) => (dispatch) =>
  utils.getComments(postId)
  .then(comments => dispatch(receiveComments(comments)))

// gets a single comment from the API
export const fetchSingleComment = (_id) => (dispatch) =>
  utils.getSingleComment(_id)
  .then(comment => dispatch(receiveSingleComment(comment)))

// adds a comment
export const addComment = (body, author, parentId) => (dispatch) =>
  utils.addComment(body, author, parentId)
  .then(comment => dispatch(receiveSingleComment(comment)))

// votes on a comment
export const voteComment = (_id, option) => (dispatch) =>
  utils.voteComment(_id, option)
  .then(comment => dispatch(receiveSingleComment(comment)))

// edits a comment
export const editComment = (_id, body) => (dispatch) =>
  utils.editComment(_id, body)
  .then(comment => dispatch(receiveSingleComment(comment)))

// deletes a comment locally
const deleteCommentLocal = (_id) => {
  return {
    type: DELETE_COMMENT,
    _id
  }
}

// deletes a comment
export const deleteComment = (_id) => (dispatch) =>
  utils.deleteComment(_id)
  .then(comment => dispatch(deleteCommentLocal(comment._id)))