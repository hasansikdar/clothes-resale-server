const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json())


async function run() {
    try {
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.i9b8vs8.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const usersCollection = client.db('resaleProduct').collection('users');
        const productsCollection = client.db('resaleProduct').collection('products');

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })


        app.post('/addProduct', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        // men, women, baby category loaded
        app.get('/products', async (req, res) => {
            const query = {
                category: 'gender',
            }

            const result = await productsCollection.find(query).toArray();
            res.send(result);

        })
        app.get('/productCategory/:id', async(req, res) => {
            const id = req.params.id;
            const query = {
                productCategory: id
            }
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(error => console.log(error))



app.get('/', (req, res) => {
    res.send('resale server site is running');
})
app.listen(port, (req, res) => {
    console.log('resale server is running..');
})