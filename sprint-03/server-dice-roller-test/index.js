const express = require('express')
const cors = require("cors")
const port = process.env.PORT || 3000

const app = express()

app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

app.get('/', (req, res) => res.render('home'))

app.get('/roll', (request, response) => {
	console.log('Calling "/roll".')

    let roll = Math.floor(Math.random() * 20) + 1
    response.send(roll.toString())
})

// Custom 404 page.
app.use((request, response) => {
    response.sendStatus(404)
    response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
    console.error(err.message)
    response.sendStatus(500)
    response.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
)