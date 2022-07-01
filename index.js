const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors())
app.use(express.json())
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pcxdl4u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("Database Connected");
        const taskCollection = client.db('TaskManager').collection('task')

        //post new task
        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result)

        })

        // Get task
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const task = await cursor.toArray();
            res.send(task);
        })

        // Add Task Status (complete)
        app.put('/task/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: "complete"
                }
            };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Task CRUD Server");
})

app.listen(port, () => {
    console.log("CRUD server is running");
})