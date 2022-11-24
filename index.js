const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json())


async function run(){
    try{
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.i9b8vs8.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const usersCollection = client.db('resaleProduct').collection('users');

        
        
    
    }
    finally{

    }
}
run().catch(error => console.log(error))



app.get('/', (req, res) => {
    res.send('resale server site is running');
})
app.listen(port, (req, res) => {
    console.log('resale server is running..');
})