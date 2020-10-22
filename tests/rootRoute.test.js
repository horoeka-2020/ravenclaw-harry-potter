const request = require('supertest')
const cheerio = require('cheerio')


const rootRoute = require('../server')

test('home page contains Harry Potter', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const title = $('.title').text()
      expect(title).toMatch('Harry Potter')
      done()
    })
})

test('home page contains "Add yourself to a house!" page link', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const homeLink = $('.nav').text()
      expect(homeLink).toMatch('Add yourself to a house!')
      done()
    })
})

test('home page has the right number of houses', done => {
  request(rootRoute)
    .get('/')
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      const friends = $('.house-list')
      expect(friends).toHaveLength(4)
      done()
    })
})