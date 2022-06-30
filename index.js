const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors())
app.use(express.json())
require('dotenv').config()


app.get('/', (req, res) => {
    res.send("Task CRUD Server");
})

app.listen(port, () => {
    console.log("CRUD server is running");
})