const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  "title": "Evil HR Lady",
  "author": "Suzanne Lucas",
  "url": "http://www.evilhrlady.org/",
  "likes": 7
},
{
  "title": "EkhartYoga",
  "author": "Yogi",
  "url": "https://www.ekhartyoga.com",
  "likes": 6
},
{
  "title": "Daily Cup of Yoga",
  "author": "Brian",
  "url": "http://dailycupofyoga.com/",
  "likes": 3
},
{
  "title": "Yay for Today",
  "author": "Yogi",
  "url": "https://www.yayfortoday.net/",
  "likes": 3
}
]

const initialUsers = [{
  "username": "unelmoija",
  "name": "Maisa",
  "ofAge": true,
  "password": "salamaisa"
},
{
"username": "tallustelija",
"name": "Tellu",
"ofAge": true,
"password": "salatellu"
}

]

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const formatNoID = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const formatUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    ofAge: user.ofAge,
    id: user._id
  }
}

const formatUserNoID = (user) => {
  return {
    username: user.username,
    name: user.name,
    ofAge: user.ofAge
  }
}


const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(formatUser)
}

module.exports = {
  initialBlogs, initialUsers, formatBlog, formatNoID, formatUser, formatUserNoID,
  nonExistingId, blogsInDb, usersInDb
}