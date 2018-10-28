const favouriteBlog = require('../utils/list_helper').favouriteBlog


const blog1 = []

const blog2 = [{
  "title": "EkhartYoga",
  "author": "Esther Ekhart",
  "url": "https://www.ekhartyoga.com",
  "likes": 6
}]

const blog3 = [{
  "title": "EkhartYoga",
  "author": "Esther Ekhart",
  "url": "https://www.ekhartyoga.com",
  "likes": 6
},
{
  "title": "Evil HR Lady",
  "author": "Suzanne Lucas",
  "url": "http://www.evilhrlady.org/",
  "likes": 7
},
{
  "title": "Daily Cup of Yoga",
  "author": "Brian",
  "url": "http://dailycupofyoga.com/",
  "likes": 3
}]

describe('most likes', () => {

  test('of empty list', () => {
    expect(favouriteBlog(blog1)).toEqual([])
  })

  test('of one blog', () => {
    expect(favouriteBlog(blog2)).toEqual(blog2[0])
  })

  test('of many blogs is', () => {
    expect(favouriteBlog(blog3)).toEqual(blog3[1])
  })

})
