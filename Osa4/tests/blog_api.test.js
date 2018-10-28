const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
//const { initialBlogs, blogsInDb } = require('./test_helper')


describe('Reset database', async () => {
  beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
    console.log('done')
    /*for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }*/
  })

  describe('Testing GET', () => {

    test('GET: blogs are returned as json, complete list returned', async () => {
      const blogsInDatabase = await helper.blogsInDb()
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogsInDatabase.length)

      const returnedTitles = response.body.map(b => b.title)
      blogsInDatabase.forEach(blog => {
        expect(returnedTitles).toContain(blog.title)
      })
    })

    test('GET: spot check author of 2nd block', async () => {
      const blogsInDatabase = await helper. blogsInDb()

      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body[1].author).toBe(blogsInDatabase[1].author)
    })
  })


  describe('Testing POST', () => {

    test('POST: a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Community Journals',
        author: 'Jivamukti Yoga School',
        url: 'https://jivamuktiyoga.com/community-journals/',
        likes: 3
      }

      const blogsBefore = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDb()
      const formattedList = blogsAfter.map(item => helper.formatNoID(item))

      expect(blogsAfter.length).toBe(blogsBefore.length+1)
      expect(formattedList).toContainEqual(newBlog)
    })

    test('POST: if no info about likes, it is set to value 0 ', async () => {
      const newBlog = {
        title: 'Happy Mind Magazine',
        author: 'Christina',
        url: 'https://www.happymindmagazine.de/'
      }

      const blogsBefore = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDb()
      const titleList = blogsAfter.map(b => b.title)
      const newBlogIndex = titleList.indexOf(newBlog.title)

      expect(blogsAfter.length).toBe(blogsBefore.length+1)
      expect(blogsAfter[newBlogIndex].likes).toBe(0)
    })

    test('POST: if blog has no title, it is rejected', async () => {
      const newBlog = {
        author: 'Christina',
        url: 'https://www.happymindmagazine.de/'
      }

      const blogsBefore = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('POST: if blog has no url, it is rejected', async () => {
      const newBlog = {
        title: 'Happy Mind Magazine',
        author: 'Christina',
        likes: 3
      }

      const blogsBefore = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })


  describe('Testing DELETE', () => {
    test('DELETE /api/blogs/:id successful', async () => {
      const addedBlog = {
        title: 'Journals',
        author: 'School',
        url: 'https://journals/',
        likes: 1
      }

      const blogsBefore = await helper.blogsInDb()
      await api
        .post('/api/blogs')
        .send(addedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsBetween = await helper.blogsInDb()
      expect(blogsBetween.length).toBe(blogsBefore.length+1)

      const titleList = blogsBetween.map(item => item.title)
      const blogIndex = titleList.indexOf(addedBlog.title)
      const blogId = blogsBetween[blogIndex].id

      await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)

      const blogsAfter = await helper.blogsInDb()
      const formattedList = blogsAfter.map(item => helper.formatNoID(item))

      expect(blogsAfter.length).toBe(blogsBefore.length)
      expect(formattedList).not.toContainEqual(addedBlog)
    })
  })


  describe('Testing PUT', () => {
    test('PUT /api/blogs/:id successful', async () => {

      const blogsBefore = await helper.blogsInDb()

      const blogOld = blogsBefore[0]
      const blogId = blogsBefore[0].id
      console.log('old Blog', blogOld)

      const updatedBlog = {
        title: blogOld.title + 'new',
        author: blogOld.author,
        url: blogOld.url,
        likes: blogOld.likes+2
      }
      console.log('updated Blog', updatedBlog)

      await api
        .put(`/api/blogs/${blogId}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAfter = await helper.blogsInDb()

      expect(blogsAfter.length).toBe(blogsBefore.length)
      expect(helper.formatNoID(blogsAfter[0])).toEqual(updatedBlog)
      expect(blogsAfter[0].likes).toBe(updatedBlog.likes)
    })
  })

  afterAll(() => {
    server.close()
  })
})