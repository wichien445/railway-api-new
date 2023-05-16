const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const urlRoute = require('./Routes/url')
const URL = require('./models/url')

const app = express()
require('dotenv').config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(()=>console.log("Connect DataBase Succeed"))
.catch((err)=>console.log(err))

app.use(cors())
app.use(express.json())

//Router
app.use("/url", urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    try {
      const entry = await URL.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now()
            }
          }
        }
      )
  
      if (entry && entry.redirectURL) {
        res.redirect(entry.redirectURL)
      } else {
        res.status(404).send('URL not found')
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  })

//Set Port
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Start Server In Port ${port}`)
})