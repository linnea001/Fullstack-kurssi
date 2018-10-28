const mostBlogs = require('../utils/list_helper').mostBlogs


const blog1 = []

const blog2 = [{
  "title": "EkhartYoga",
  "author": "Esther Ekhart",
  "url": "https://www.ekhartyoga.com",
  "likes": 6
}]

const blog3 = [{
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

describe('most blogs', () => {

  test('of empty list', () => {
    expect(mostBlogs(blog1)).toEqual([])
  })

  test('of one blog', () => {
    expect(mostBlogs(blog2)).toEqual([{"author": blog2[0].author, "blogs": 1}])
  })

  test('of many blogs', () => {
    expect(mostBlogs(blog3)).toEqual([{"author": blog3[1].author, "blogs": 2}])
  })

})
