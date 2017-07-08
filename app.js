const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// put routes here
// create api endpoint
// GET /api/todos/ - return a JSON array of todo items
app.get('/api/todos', function (req, res) {
  res.json(todos);
});

// POST /api/todos/ - post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
app.post('/api/todos', function (req, res) {
  res.json(todos);
});

// GET /api/todos[/id] - get a specific todo item.
app.get('/api/todos/:id', function(req, res) {
  var id = Number(req.params.id);
  var todo = todos.find(function(todoItem) {
    return todoItem.id === id;
  });
  res.json(todo);
});

// PUT /api/todos[/id] - update a todo item. Returns the modified todo item.
app.put('/api/todos/:id', function(req, res) {
  var id = Number(req.params.id);
  var todo = todos.find(function(todoItem) {
    return todoItem.id === id;
  });
  res.json(todo);
});

// PATCH /api/todos[/id] - partially update a todo item. Returns the modified todo item.
app.patch('/api/todos/:id', function(req, res) {
  var id = Number(req.params.id);
  var todo = todos.find(function(todoItem) {
    return todoItem.id === id;
  });
  res.json(todo);
});

// DELETE /api/todos[/id] - deletes a todo item. Returns the todo item that was deleted.
app.delete('/api/todos/:id', function(req, res) {
  var id = Number(req.params.id);
  var todo = todos.find(function(todoItem) {
    return todoItem.id === id;
  });
    res.json(todo);
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
