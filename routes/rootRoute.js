const express = require('express')

const fs = require('fs')

const path = require('path')

const router = express.Router()
router.use(express.urlencoded({ extended: false }))

module.exports = router

// GET /
router.get('/', (req, res, next) => {
  // create the file path string
  const filePath = path.join(__dirname, '..', 'data.json')
  // read the file into a string
  fs.readFile(filePath, 'utf8', (err, contents) => {
    // respond with a 500 if there is an error
    if (err) return res.status(500).send(err.message)
    // parse the string contents into a JS object
    const data = JSON.parse(contents)
    // construct the view data of an array of houses
    const viewData = {
      houses: data.houses
    }
    // render the template with our view data
    res.render('home', viewData)
  })
})

// GET /:id
router.get('/:id', (req, res) => {
  const id = req.params.id

  const filePath = path.join(__dirname, '..', 'data.json')
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) return res.sendStatus(500)
    const data = JSON.parse(contents)
    // Accessing individual house object from data.json
    const viewData = {
      characters: data.houses[id - 1].characters,
      id: id
    }
    // render the template with our view data
    res.render('house', viewData)
  })
})
