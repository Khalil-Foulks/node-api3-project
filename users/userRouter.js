const express = require('express');
const Userdb = require('../users/userDb')
const customMw = require('../customMiddleware/customMiddleware') 

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Userdb.get(req.query)
    .then(allUsers => {
      res.status(200).json({ allUsers })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: error.message });
    })
});

router.get('/:id', customMw.validateUserId, (req, res) => {
  const id = req.params.id

  Userdb.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: error.message });
  })
});

router.get('/:id/posts', customMw.validateUserId, (req, res) => {
  const id = req.params.id

  Userdb.getUserPosts(id)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: error.message });
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
