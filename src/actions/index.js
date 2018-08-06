import * as utils from "../utils"

// action type strings
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_SINGLE_POST = "RECEIVE_SINGLE_POST"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const RECEIVE_SINGLE_COMMENT = "RECEIVE_SINGLE_COMMENT"

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
export const fetchSinglePost = (id) => (dispatch) =>
  utils.getPost(id)
  .then(post => dispatch(receiveSinglePost(post)))

// votes on a post
export const votePost = (id, option) => (dispatch) =>
  utils.votePost(id, option)
  .then(post => dispatch(receiveSinglePost(post)))

// edits a post
export const editPost = (id, title, body) => (dispatch) =>
  utils.editPost(id, title, body)
  .then(post => dispatch(receiveSinglePost(post)))

// deletes a post on the API
export const deletePost = (id) => (dispatch) =>
  utils.deletePost(id)
  .then(post => dispatch(receiveSinglePost(post)))

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
export const fetchSingleComment = (id) => (dispatch) =>
  utils.getSingleComment(id)
  .then(comment => dispatch(receiveSingleComment(comment)))

// adds a comment
export const addComment = (body, author, parentId) => (dispatch) =>
  utils.addComment(body, author, parentId)
  .then(comment => dispatch(receiveSingleComment(comment)))

// votes on a comment
export const voteComment = (id, option) => (dispatch) =>
  utils.voteComment(id, option)
  .then(comment => dispatch(receiveSingleComment(comment)))

// edits a comment
export const editComment = (id, body) => (dispatch) =>
  utils.editComment(id, body)
  .then(comment => dispatch(receiveSingleComment(comment)))

// deletes a comment
export const deleteComment = (id) => (dispatch) =>
  utils.deleteComment(id)
  .then(comment => dispatch(receiveSingleComment(comment)))