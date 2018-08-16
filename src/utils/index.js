require('dotenv').config()
const remoteURL = "https://protected-sierra-79444.herokuapp.com"
const localURL = "http://localhost:3001"

export const api = process.env.USE_REMOTE_BACKEND === 'true' ? remoteURL : localURL

const token = "timisawesome"

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// get all categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())

// get all posts
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())

// get posts from one category
export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
  
// add a post
export const addPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body,
      author,
      category,
    })
  })
  .then(res => res.json())

// get a single post
// if an invalid _id is given, this returns a json with an 'error' property
export const getPost = (_id) =>
  fetch(`${api}/posts/${_id}`, { headers })
  .then(res => res.json())
  
// vote on a post
export const votePost = (_id, option) =>
  fetch(`${api}/posts/${_id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

// edit a post
export const editPost = (_id, title, body) => 
  fetch(`${api}/posts/${_id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())

// delete a post
export const deletePost = (_id) => 
  fetch(`${api}/posts/${_id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

// get comments for a post
export const getComments = (postId) => 
  fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())

// add a comment
export const addComment = (body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body, author, parentId })
  }).then(res => res.json())

// get a single comment
export const getSingleComment = (_id) => 
  fetch(`${api}/comments/${_id}`, { headers })
  .then(res => res.json())

// vote on a comment
export const voteComment = (_id, option) => 
  fetch(`${api}/comments/${_id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id, option })
  }).then(res => res.json())

// edit a comment
export const editComment = (_id, body) => 
  fetch(`${api}/comments/${_id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body
    })
  }).then(res => res.json())

// delete a comment
export const deleteComment = (_id) =>
  fetch(`${api}/comments/${_id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())


const compare = (post1, post2, option) => {
  switch (option) {
    case "title" :
    case "author" :
      if (post1[option] < post2[option]) {
        return -1
      } else if (post1[option] > post2[option]) {
        return 1
      } else {
        return post2.voteScore - post1.voteScore
      }

    default :
      return post2.voteScore - post1.voteScore
  }
}

export const sort = (posts, option) => {
  return posts.sort((post1, post2) => compare(post1, post2, option))
}