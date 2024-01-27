const express = require('express');
const cors = require('cors');
require('dotenv').config();
const config = require('./config/development.js');
const app = express();
const path = require('path');
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
require('./config/db.js');
const port = config?.port || 5000

global.__basedir = "./public/audio"
app.use('/public/audio/', express.static(path.join(__dirname, 'public')));

app.use("/api/v1/audio", require("./routers/audioRouter"));

app.get('/', (req,res)=>{
    res.send('Server is running')
})

app.listen(port, ()=>{
    console.log("Server is listening on ", port);
})