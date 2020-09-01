const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongodb =require('mongodb')
const bodyParser = require('body-parser')
const ObjectID = mongodb.ObjectID

let database 

const insert = (db, collectionName, doc) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.insert(doc,(err,result) => {
      if(err){
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const find = (db, collectionName, filter) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    const cursor =collection.find(filter)
    const results = []
    cursor.forEach(doc => results.push(doc),
      err => {
        if(err){
          reject(err)
        }else{
          resolve(results)
        }
      })
  })
}

const deleteOne = (db, collectionName, filter) =>{
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.deleteOne(filter, (err, results) => {
      if(err){
        reject(err)
      } else{
        resolve(results)
      }
    })
  })
}
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
  const items = [{name: 'teste1'}, {name: 'teste2'}]
  res.render('index',{title: 'FullStack-Projeto-Pratico', items})
})

app.get('/restaurantes', async (req, res) => {
  const restaurantes = await find(database, 'restaurantes', {})
  //restaurantes.forEach(r => console.log(r))
  res.render('restaurantes', {restaurantes})
})

app.get('/restaurantes/novo', async (req, res) => {
  res.render('restaurante_novo')
})

app.post('/restaurantes/novo', async(req, res) => {
  const restaurante = {
    nome: req.body.nome,
    loc:{
      type: 'Point',
      coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }
  }
  await insert(database, 'restaurantes', restaurante)
  res.redirect('/restaurantes')
})

app.get('/restaurantes/delete/:id', async(req,res) => {
  await deleteOne(database, 'restaurantes', {
    _id: ObjectID(req.params.id)
  })
  res.redirect('/restaurantes')
})

const MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://localhost:27017/iRango',(err,db) => {
  database = db
  app.listen(port, () => "server is running...")
})
