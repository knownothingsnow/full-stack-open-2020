const _ = require('lodash')
function dummy (blogs) {
  // console.log(blogs);
  return 1
}

function totalLikes (list) {
  return list.reduce((sum, curr) => {
    sum += curr.likes
    return sum
  }, 0)
}

function favoriteBlog (list) {
  let max = 0
  let favoriteBlog = null
  for (const item of list) {
    // console.log(item.likes);
    if (item.likes >= max) {
      max = item.likes
      favoriteBlog = item
    }
  }
  return favoriteBlog
}

function mostBlogs (list) {
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

function mostLikes (list) {
  const result = _.groupBy(list, 'author')
  for (const key in result) {
    result[key] = totalLikes(result[key])
  }
  let max = 0

  let name
  _.forEach(result, function (value, key) {
    if (max < value) {
      max = value
      name = key
    }
  })
  return {
    author: name,
    likes: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
