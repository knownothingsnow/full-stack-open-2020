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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}