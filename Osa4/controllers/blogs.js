const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate ('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})


blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    // middleware const token = request.token
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.title.length === 0)  {
      return response.status(400).json({ error: 'title missing' })
    }

    if (body.url === undefined || body.url.length === 0) {
      console.log('len')
      return response.status(400).json({ error: 'url missing' })
    }


    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const delBlog = await Blog.findById(request.params.id)

    if (!delBlog) {
      return response.status(400).json({ error: 'malformatted or wrong blog id' })
    }

    if ( delBlog.user.toString() === user._id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    else {
      return response.status(400).json({error: 'user does not have rights to delete'})
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'some error' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    await Blog.findByIdAndUpdate(request.params.id,
      { title:blog.title, author:blog.author, url:blog.url, likes: blog.likes },
      { new: true })
    response.json(Blog.format(blog))

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter