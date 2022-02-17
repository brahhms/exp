const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var cors = require('cors')

const app = express()
app.use(cors())


const connectionString = 'mongodb://127.0.0.1:27017';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('hdb')
    const expedientesCollection = db.collection('expedientes')

    app.use(bodyParser.json())

    // ========================
    // Routes
    // ========================
    app.get('/expedientes', (req, res) => {
      if (req.query.q) {
        db.collection('expedientes').find({ no: Number(req.query.q) }).toArray()
          .then(expedientes => {
            res.send(expedientes)
          })
          .catch(/* ... */)
      } else {
        db.collection('expedientes').find().toArray()
          .then(expedientes => {
            res.send(expedientes)
          })
          .catch(/* ... */)
      }

    })

    app.post('/expedientes', (req, res) => {
      expedientesCollection.insertOne(req.body)
        .then(result => {
          console.log(result);
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/expedientes', (req, res) => {
      expedientesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/expedientes', (req, res) => {
      expedientesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    app.listen(3000, function () {
      console.log(`listening on 3000`)
    })
  })
  .catch(console.error)