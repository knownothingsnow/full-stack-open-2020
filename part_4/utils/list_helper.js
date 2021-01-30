const _ = require('lodash')
function dummy(blogs) {
  // console.log(blogs);
  return 1
}

function totalLikes(list) {
  return list.reduce((sum, curr) => {
    return sum += curr.likes
  }, 0)
}

function favoriteBlog(list) {
  let max = 0
  let favoriteBlog = null
  for (let item of list) {
    // console.log(item.likes);
    if (item.likes >= max) {
      max = item.likes
      favoriteBlog = item
    }
  }
  return favoriteBlog
}

function mostBlogs(list) {
  const result = _.groupBy(list, 'author')
  let max = 0
  let author
  _.forEach(result, function (value, key) {
    if (value.length > max) {
      max = value.length
      author = key
    }
  })
  return {
    author,
    blogs: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}