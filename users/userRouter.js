const express = require('express');
const Userdb = require('../users/userDb')
const Postdb = require("../posts/postDb")
const customMw = require('../customMiddleware/customMiddleware') 

const router = express.Router();

router.post('/', customMw.validateUser, (req, res) => {
  const body = req.body

  Userdb.insert(body) 
    .then(user => {
      res.status(201).json({ user })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error.message });
    })
});

//needs to be fixed: validation is only hitting body.text check
router.post('/:id/posts', customMw.validateUserId, customMw.validatePost, (req, res) => {
  const body = req.body

  Postdb.insert(body)
    .then(post => {
      res.status(201).json({ post })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error.message });
    })
});

router.get('/', (req, res) => {
  Userdb.get(req.query)
    .then(allUsers => {
      res.status(200).json({ allUsers })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error.message });
    })
});

router.get('/:id', customMw.validateUserId, (req, res) => {
  const id = req.params.id

  Userdb.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: error.message });
  })
});

router.get('/:id/posts', customMw.validateUserId, (req, res) => {
  const id = req.params.id

  Userdb.getUserPosts(id)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    })
});

router.delete('/:id', customMw.validateUserId, (req, res) => {
  const id = req.params.id

  Userdb.remove(id)
    .then(user => {
      res.status(204).end();
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    })
});

router.put('/:id', customMw.validateUserId, customMw.validateUser, (req, res) => {
  const body = req.body
  const id = req.params.id

  Userdb.update(id, body)
    .then(user => {
      res.status(200).json({ body })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
