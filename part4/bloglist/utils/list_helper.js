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
  if (blogs.length == 0) return {};
  const countBlog = (blog) => {
    return blog.author;
  };

  blogCountsByAuthor = _.countBy(blogs, countBlog);
  const blogCountKey = _.keys(blogCountsByAuthor).reduce((acc, item) => 
    blogCountsByAuthor[acc] > blogCountsByAuthor[item] ? acc : item
  );

  return {
    author: blogCountKey,
    blogs: blogCountsByAuthor[blogCountKey]
  };
};

const mostLikes = (blogs) => {
  if (blogs.length == 0) return {};

  const blogCountsByAuthor = _.transform(blogs, (result, item) => {
    const key = item.author.replace(/\./g,'')
    _.set(result, key, (result[key] || 0) + item.likes);
  }, {});
  console.log(blogCountsByAuthor);

  const blogCountKey = _.keys(blogCountsByAuthor).reduce((acc, item) => 
    blogCountsByAuthor[acc] > blogCountsByAuthor[item] ? acc : item
  );
  return {
    author: blogCountKey,
    likes: blogCountsByAuthor[blogCountKey]
  };
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes
};