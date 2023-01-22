const listHelper = require('../utils/list_helper');
const {blogs, blogsSingle} = require('./data');

test('dummy returns 1', () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {

  test('when one blog, likes should equal the one blog', () => {
    expect(listHelper.totalLikes(blogsSingle)).toBe(7);
  });

  test('when multiple blogs, likes should equal the sum of each blog', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });

  test('when no blogs given, likes should equal 0', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
});

describe('favorite blog', () => {
  
  test('when no blogs, favorite blog should be empty', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('when one blog, favorite blog should be the one blog', () => {
    expect(listHelper.favoriteBlog(blogsSingle)).toEqual(blogsSingle[0]);
  });

  test('when multiple logs, favorite blog should be blog with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
    );
  });
});

