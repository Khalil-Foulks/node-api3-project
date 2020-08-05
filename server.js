const express = require('express');
const customMw = require('./customMiddleware/customMiddleware')

const server = express();

//Router import Here
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

//Global Middleware here
server.use(express.json());
server.use(customMw.logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

module.exports = server;
