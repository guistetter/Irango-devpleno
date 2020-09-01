const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const insert = (db, collectionName, doc) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.insert(doc,(err, result) =>{
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

const find = (db, collectionName, filter) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    collection.find(filter,(err,results) =>{
      if(err){
        reject(err)
      } else{
        resolve(results)
      }
    })
  })
}

MongoClient.connect('mongodb://localhost:27017/iRango', async (err, db)=>{
  await insert(db,'pessoas',{
    name: 'outro teste',
    lastName: 'async outro teste'
  })
  const pessoas = await find(db, 'pessoas',{})
  pessoas.forEach(p => console.log(p))
  console.log(pessoas)
})