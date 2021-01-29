function dummy(blogs) {
  console.log(blogs);
  return 1
}

function totalLikes(list) {
  return list.reduce((sum, curr) => {
    return sum += curr.likes
  }, 0)
}

module.exports = {
  dummy,
  totalLikes,
}