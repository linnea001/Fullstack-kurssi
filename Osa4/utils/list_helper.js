const dummy = (blogs) => {
  const value = 1
  return value
}

const totalLikes = (blogs) => {
  const reducer = ( sum, next) => {
    return sum + Number(next.likes)
  }
  return blogs.reduce(reducer,0)
}


const favouriteBlog = (blogs) => {
  if (blogs.length === 0)
    return []
  const reducer = ( mostVotes, next) => {
    return Math.max(mostVotes, Number(next.likes))
  }

  const best = blogs.find(blog => blog.likes === blogs.reduce(reducer,0))
  return best
}


const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return []
  const authors = blogs.map(blog => blog.author)
  const hitsPerAuthor = authors.map(author => (authors.filter(name => name === author)).length)
  const maxHits = Math.max(...hitsPerAuthor)
  const blogger = [{
    "author": blogs[hitsPerAuthor.indexOf(maxHits)].author,
    "blogs": maxHits
  }]
  return blogger
}


const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return []
  const likesPerAuthor = blogs.map(blog => {
    const blogList = blogs.filter(next => next.author === blog.author)
    const total = totalLikes(blogList)
    return total
  })
  const mostLikes = Math.max(...likesPerAuthor)
  const blogger = [ { 
    "author": blogs[likesPerAuthor.indexOf(mostLikes)].author,
    "likes": mostLikes
  }]
  return blogger
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}