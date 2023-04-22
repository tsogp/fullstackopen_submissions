const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,

    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,

    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,

    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,

    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,

    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({});
    
    for (let blog of blogs) {
        let b = new Blog(blog)
        await b.save()
    }
}, 100000);

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(blogs.length)
});
  
test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'React patterns'
    )
});

test('id row exists', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0]._id).toBeDefined()
});

test('post creates new blog', async () => {
    const initialState = await api.get('/api/blogs')
    
    const blog = new Blog({
        title: "lol221",
        author: "anthony pro",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: -1,
    })
    await blog.save();
    
    const currentState = await api.get('/api/blogs')
  
    expect(initialState.body.length).toEqual(currentState.body.length - 1)
});

test('default like is 0', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[5].likes).toEqual(0)
});

test('no title or no url => 400 bad request', async () => {
    const blog = new Blog({
        title: "lol221",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: -1,
    })
    
    await api
        .post("/api/blogs")
        .send(blog)
        .expect(400)
});

