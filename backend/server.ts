import express from 'express'

import authRouter from './routes/auth'
import postsRouter from './routes/posts'
import usersRouter from './routes/users'

const server = express();

const cors = require('cors');
server.use(cors({  
    origin: "*",
    optionSuccessStatus: 200
}))

server.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true.toString())
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

server.use(express.json());

server.use('/', authRouter);
server.use('/posts', postsRouter)
server.use('/users', usersRouter)

server.listen(3002);