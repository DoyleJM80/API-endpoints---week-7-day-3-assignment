const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Todos = require('./models/todos');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/jbtodolist');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
});

// put routes here
// GET /api/todos/ - return a JSON array of todo items
app.get('/api/todos', (req, res) => {
  Todos.find({}).then((results) => {
  res.json(results);
  });
});

// POST /api/todos/ - post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
app.post('/api/todos', (req, res) => {
  const todo = new Todos ({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  });
    todo.save();
    res.json(Todos);
});

// GET /api/todos[/id] - get a specific todo item.
app.get('/api/todos/:id', (req, res) => {
  var id = req.params.id;
  Todos.find({_id: id}).then((todo) => {
    res.json(todo);
  });
});

// PUT /api/todos[/id] - update a todo item. Returns the modified todo item.
app.put('/api/todos/:id', (req, res) => {
  var id = req.params.id;
  var title = req.body.title;
  var order = req.body.order;
  var completed = req.body.completed;
  Todos.findOne({_id: id}).then((result) => {
    result.title = title;
    result.order = order;
    result.completed = completed;
    result.save();
  });
  res.json(Todos);
});

// PATCH /api/todos[/id] - partially update a todo item. Returns the modified todo item.
app.patch('/api/todos/:id', (req, res) => {
  console.log('patch working');
  var id = req.params.id;
  var title = req.body.title;
  var order = req.body.order;
  var completed = req.body.completed;
  if (req.body.title) {
    Todos.update(
      {_id: id},
      {$set: {title: title}}
    ).then((result) => {
      result.save();
    });
  }
  if (req.body.order) {
    Todos.update(
      {_id: id},
      {$set: {order: order}}
    ).then((result) => {
      result.save();
    });
  }
  if (req.body.completed) {
    Todos.update(
      {_id: id},
      {$set: {completed: completed}}
    ).then((result) => {
      result.save();
    });
  }
  // console.log(Todos);
  res.json(Todos);
});

// DELETE /api/todos[/id] - deletes a todo item. Returns the todo item that was deleted.
app.delete('/api/todos/:id', (req, res) => {
  var id = req.params.id;
  Todos.deleteOne({
    _id: id
  }).then((result) => {
    res.json(result);
  });
});


app.listen(3000, function () {
    console.log('listening')
});

// ----ADDING TEST DATA TO DATABASE
// const todo = new Todos({
//   title: 'Finish Assessment'
//   , order: 1
//   , completed: false
// });
//
// todo.save();
