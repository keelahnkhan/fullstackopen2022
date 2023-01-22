const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const accumulator = (sum, blog) => {
    return sum + blog.likes;
  }

  return blogs.reduce(accumulator, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = (prevBig, blog) => {
      return prevBig.likes > blog.likes ? prevBig : blog;
  }

  return blogs.length == 0 ? {} : blogs.reduce(favorite);
};

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog
};