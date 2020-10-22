const express = require('express')
const hbs = require('express-handlebars')
const router = require('./routes/rootRoute')
const editRouter = require('./routes/editRoute')
const newRouter = require('./routes/newRoute')
const displayHouseRouter = require('./routes/displayHouseRoute')
// const router = express.Router()
// router.use(express.urlencoded({extended: false}))

const server = express()

module.exports = server

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use('/displayHouse', displayHouseRouter)
server.use('/edit', editRouter) //edit router
server.use('/new', newRouter) //new router
server.use('/', router)

// Your routes should go here

// server.get('/', (req,res) => {
//   res.render('home')
// }) 