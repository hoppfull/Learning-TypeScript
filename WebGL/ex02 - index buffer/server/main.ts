import * as express from 'express'

const app = express()
const PORT = 8000

app.use(express.static('./client/html'))
app.use(express.static('./client/bin'))
app.use(express.static('./client/resources'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
