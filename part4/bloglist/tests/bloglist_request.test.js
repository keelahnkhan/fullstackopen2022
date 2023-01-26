const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

const blogs = [
  {
    title: "The Mongol Times",
    author: "Genghis Khan",
    url: "temujin-talks.com",
    likes: 19
  }, 
  {
    title: "Innistrad Newspaper",
    author: "Ludevic",
    url: "gavony-times.com",
    likes: 13
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogs.map(blog => new Blog(blog));
  await Promise.all(blogObjects.map(blog => blog.save()));
});

describe('retrieve blog list', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});