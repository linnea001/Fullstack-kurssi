const totalLikes = require('../utils/list_helper').totalLikes


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
  "likes": 3
},
{
  "title": "Daily Cup of Yoga",
  "author": "Brian",
  "url": "http://dailycupofyoga.com/",
  "likes": 3
}]

describe('total likes', () => {

  test('of empty list', () => {
    expect(totalLikes(blog1)).toBe(0)
  })

  test('of one blog', () => {
    expect(totalLikes(blog2)).toBe(6)
  })

  test('of many blogs is the sum', () => {
    expect(totalLikes(blog3)).toBe(12)
  })

})
