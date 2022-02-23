import express from "express"
import mongoose from "mongoose"
import Data from './data.js'
import Videos from './dbModel.js'

//app config test
const app = express()
const port = process.env.PORT || 9000

//middlwares 
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*'),
    next()
})

//DB config
const connection_url= 'mongodb+srv://admin:******************@cluster0.p6ave.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
})

//api endpoints
app.get("/", (req, res) => res.status(200).send("Hello Word 1° try!!!"))

app.get("/v1/posts", (req, res) => res.status(200).send(Data))

app.get("/v2/posts", (req, res) => {
    Videos.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post("/v2/posts", (req, res) => {
    //POST request is to ADD DATA to the database
    //It will let us to ADD a video DOCUMENT to the videos COLLECTIONS
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(port, () => console.log(`listen on localhost: ${port}`))
