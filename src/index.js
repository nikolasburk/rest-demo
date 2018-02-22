const { send } = require('micro')
const { router, get } = require('microrouter')
const userData = require('../data/users.json')
const postData = require('../data/posts.json')

const users = (req, res) => {
  console.log(`/users`)
  const { users } = userData
  return send(res, 200, users)
}

const userById = (req, res) => {
  console.log(`/users/:id`)
  const { users } = userData
  const userIndex = users.findIndex(user => user.id === req.params.id)
  return send(res, 200, users[userIndex])
}

const postsForUser = (req, res) => {
  console.log(`/users/:id/posts`)
  const { posts } = postData
  const postsForUser = posts.filter(post => post.authorId === req.params.id)
  return send(res, 200, postsForUser)
}

const posts = (req, res) => {
  console.log(`/posts`)
  const { posts } = postData
  return send(res, 200, posts)
}

const postById = (req, res) => {
  console.log(`/posts/:id`)
  const { posts } = postData
  const postIndex = posts.findIndex(post => post.id === req.params.id)
  return send(res, 200, posts[postIndex])
}

const authorForPost = (req, res) => {
  console.log(`/posts/:id/user`)
  const { users } = userData
  const authorForPost = users.filter(user => user.postIds.includes(req.params.id))
  return send(res, 200, authorForPost)
}

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
  get('/users', users),
  get('/users/:id', userById),
  get('/users/:id/posts', postsForUser),
  get('/posts', posts),
  get('/posts/:id', postById),
  get('/posts/:id/user', authorForPost),
  get('/*', notfound),
)
