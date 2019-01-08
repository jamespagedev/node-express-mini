// implement your API here
// import db from './data/db.js'; // ES2015 Modules
const db = require('./data/db.js'); // CommonJS Modules
const express = require('express');
const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/users/:userid', (req, res) => {
  const id = req.params.userid;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  db.insert(userInfo)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user.length !== 0) {
        db.remove(id).then(count => {
          res.status(200).json(user);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specific ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  try {
    const result = await db.update(id, changes);

    console.log('result', result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.listen(5000, () => console.log('server running...'));
