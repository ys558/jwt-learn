require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
app.use(express.json())

const posts = [
  {username: 'Kyle', title: 'POST 1'},
  {username: 'Jim', title: 'POST 2'},
]

app.get('/posts', (req, res) => {
  res.json(posts)
})

app.post('/login', (req,res) => {
  // 登录token鉴权
  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken })
})

const PORT = 3000
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))