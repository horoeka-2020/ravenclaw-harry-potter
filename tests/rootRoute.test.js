const request = require('supertest')
const cheerio = require('cheerio')


const rootRoute = require('../server')

test('home page contains Pupparazzi', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const title = $('.title').text()
      expect(title).toBe('Pupparazzi')
      done()
    })
})

test('home page contains home page link', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const homeLink = $('.nav').text()
      expect(homeLink).toMatch('Home')
      done()
    })
})

test('has the right number of friends', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const friends = $('.house-list')
      expect(friends).toHaveLength(7)
      done()
    })
})