require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
app.use(express.json())

const posts = [
  {username: 'Ryan', title: 'POST 1'},
  {username: 'Sandy', title: 'POST 2'},
]

app.get('/posts', authenticateToken, (req, res) => {   
  res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req,res) => {
  // 登录token鉴权
  const username = req.body.username
  const user = { name: username }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken })
})

// middleware to judge token
function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const PORT = 3000
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))