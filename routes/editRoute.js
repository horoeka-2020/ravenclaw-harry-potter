const express = require('express')

const fs = require('fs')

const path = require('path')

const editRouter = express.Router()
editRouter.use(express.urlencoded({ extended: false }))

module.exports = editRouter

editRouter.get('/:id', (req, res) => {
  const id = req.params.id
  // Accessing individual house object from data.json

  const filePath = path.join(__dirname, '..', 'data.json')
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) return res.sendStatus(500)
    const data = JSON.parse(contents)
    const obj = data.houses.find(item => item.id === Number(id))
    const viewData = obj
    // render the template with our view data
    res.render('edit', viewData)
  })
})

editRouter.post('/:id', (req, res) => {
  const id = req.params.id
  const filePath = path.join(__dirname, '..', 'data.json')
  const newHouse = req.body
  // read the file into a string
  fs.readFile(filePath, 'utf8', (err, contents) => {
    // respond with a 500 if there is an error
    if (err) return res.sendStatus(500)
    // parse the string contents into a JS object
    const data = JSON.parse(contents)
    // push a new object onto our menu array
    const houseToEdit = data.houses.find(item => item.id === Number(id))
    houseToEdit.name = newHouse.name
    houseToEdit.values = newHouse.values
    // convert our JS object into a string
    const newContents = JSON.stringify(data, null, 2)
    // write the string back to the JSON file
    fs.writeFile(filePath, newContents, 'utf8', (err) => {
      // respond with a 500 if there is an error
      if (err) return res.sendStatus(500)
      // redirect to our /breakfast route
      res.redirect('/' + id)
    })
  })
})
