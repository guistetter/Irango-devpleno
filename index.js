const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res)=>{
  const items = [{name: 'teste1'}, {name: 'teste2'}]
 res.render('index',{title: 'FullStack-Projeto-Pratico', items})
})
app.get('/restaurants',(req,res)=>{
  res.send('ola')
})

app.listen(port, () => "server is running...")