const express = require('express')
const app = express()

app.get('/', (req, res)=>{
 res.send('Full Stack')
})

app.listen(3000, () => "server is running...")