const _ = require('lodash');

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

const mostBlogs = (blogs) => {
  const countBlog = (blog) => {
    return blog.author;
  };

  if (blogs.length == 0) return {};

  blogCountsByAuthor = _.countBy(blogs, countBlog);
  const blogCountKey = _.keys(blogCountsByAuthor).reduce((acc, item) => 
    blogCountsByAuthor[acc] > blogCountsByAuthor[item] ? acc : item
  );
  return {
    author: blogCountKey,
    blogs: blogCountsByAuthor[blogCountKey]
  };
};

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs
};