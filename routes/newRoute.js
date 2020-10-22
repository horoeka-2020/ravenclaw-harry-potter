const express = require('express')

const fs = require('fs')

const path = require('path')

const newRouter = express.Router()
newRouter.use(express.urlencoded({ extended: false }))

module.exports = newRouter

newRouter.get('/', (req, res) => {
  const id = req.params.id
  // Accessing individual house object from data.json

  const filePath = path.join(__dirname, '..', 'data.json')
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) return res.sendStatus(500)
    const data = JSON.parse(contents)
    const viewData = {
      houseData: data.houses
    }
    // render the template with our view data
    res.render('new', viewData)
  })
})

newRouter.post('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data.json')
  const newHouse = req.body

  // read the file into a string
  fs.readFile(filePath, 'utf8', (err, contents) => {
    // respond with a 500 if there is an error
    if (err) return res.sendStatus(500)
    // parse the string contents into a JS object
    const data = JSON.parse(contents)
    const copyNewHouse = { id: data.houses.length + 1, ...newHouse }
    data.houses.push(copyNewHouse)
    // convert our JS object into a string
    const newContents = JSON.stringify(data, null, 2)
    // write the string back to the JSON file
    fs.writeFile(filePath, newContents, 'utf8', (err) => {
      // respond with a 500 if there is an error
      if (err) return res.sendStatus(500)
      // redirect to our /breakfast route
      res.redirect('/' + copyNewHouse.id)
    })
  })
})
