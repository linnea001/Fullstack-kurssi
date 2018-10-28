const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')


describe('Reset user database', async () => {
  beforeAll(async () => {
    await User.remove({})
    console.log('cleared')

    const userObjects = helper.initialUsers.map(user => new User(user))
    await Promise.all(userObjects.map(user => user.save()))
    console.log('done')
  })

  describe('Testing GET', () => {

    test('GET: user are returned as json, complete list returned', async () => {
      const usersInDatabase = await helper.usersInDb()
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(usersInDatabase.length)

      const returnedUsernames = response.body.map(u => u.username)
      usersInDatabase.forEach(user => {
        expect(returnedUsernames).toContain(user.username)
      })
    })
  })

  describe('Testing POST', () => {

    test('POST: a valid user can be added ', async () => {
      const newUser = {
        username: 'lintu',
        name: 'Kaustinen',
        ofAge: true,
        password: "salakaustinen"
      }

      const usersBefore = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await helper.usersInDb()
      const formattedList = usersAfter.map(item => helper.formatUserNoID(item))
      const formattedNew = helper.formatUserNoID(newUser)

      expect(usersAfter.length).toBe(usersBefore.length+1)
      expect(formattedList).toContainEqual(formattedNew)
    })

    test('POST: if no info about being of age, it is set to value true ', async () => {
      const newUser = {
        username: 'pohtija',
        name: 'Jokunen',
        password: "salajokunen"
      }

      const usersBefore = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await helper.usersInDb()
      const userList = usersAfter.map(u => u.username)
      const newUserIndex = userList.indexOf(newUser.username)

      expect(usersAfter.length).toBe(usersBefore.length+1)
      expect(usersAfter[newUserIndex].ofAge).toBe(true)
    })

    test('POST: if password is < 3 chars. no user created', async () => {
      const newUser = {
        username: 'lintu',
        name: 'Kaustinen',
        ofAge: true,
        password: "sa"
      }

      const usersBefore = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await helper.usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('POST: username must be unique', async () => {
      const newUser = {
        "username": "unelmoija",
        "name": "Ulla",
        "ofAge": true,
        "password": "salaulla"
      }

      const usersBefore = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    })
  })

  
  afterAll(() => {
    server.close()
  })

})