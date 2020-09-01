const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongodb =require('mongodb')

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
    collection.find(filter, (err, results) =>{
      if(err){
        reject(err)
      }else{
        resolve(results)
      }
    })
  })
}

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const items = [{name: 'teste1'}, {name: 'teste2'}]
  res.render('index',{title: 'FullStack-Projeto-Pratico', items})
})

app.get('/restaurantes', async (req, res) => {
  const restaurantes = await find(database, 'restaurantes', {})
  res.render('restaurantes',{restaurantes})
})

app.get('/restaurantes/novo', async (req, res) => {
  res.render('restaurante_novo')
})

app.post('/restaurantes/novo', (req, res) => {
  
})

const MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://localhost:27017/iRango',(err,db) => {
  database = db
  app.listen(port, () => "server is running...")
})
