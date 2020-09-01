const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  const items = [{name: 'teste1'}, {name: 'teste2'}]
 res.render('index',{title: 'FullStack-Projeto-Pratico', items})
})

app.listen(3000, () => "server is running...")