const {client} = require('./database/configuration')
var express = require('express');
var router = express.Router();

router.post('/posts', function (req, res) {
  user_id = req.body.user_id;
  id = req.body.id;
  text = req.body.text;
  description = req.body.description;
  var query = "Insert into posts (user_id,id,text,description) values ($1,$2,$3,$4) returning text,description";
  client.query(query, [user_id, id, text, description], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result.rows[0]);
    }
  })
})
router.get('/posts/:id', function (req, res) {
  id = req.params.id;
  var query = "select * from posts where id=$1";
  client.query(query, [id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})
router.get('/posts/userid/:user_id', function (req, res) {
  user_id = req.params.user_id;
  var query = " select * from posts where user_id=$1";
  client.query(query, [user_id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result.rows);
    }
  })
})
router.get('/users/posts/:user_id', function (req, res) {
  user_id = req.params.user_id;
  var query = "select *users, *posts from users inner join posts on users.id=$1";
  client.query(query, [user_id], function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})


module.exports = router;
