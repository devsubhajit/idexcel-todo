const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json())
const todos = [];

app.get('/todos', (req, res) => {
    res.json({
        resCode:200,
        todos: todos
    })
});

app.post('/todos', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const item = req.body.item;
    todos.push({
        id: id,
        item: item,
        status:'pending'
    });
    res.status(201).json({
        resCode: 200,
        message: 'New List has been created',
        todos: todos
    });
});


app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(item => item.id === id);
    todos.splice(index, 1)
    res.status(201).json({
        resCode: 200,
        message: 'Item has been deleted',
        todos: todos
    });
});
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(item => item.id === id);
    todos[index].status = req.body.status;
    res.status(201).json({
        resCode: 200,
        message: 'Item has been updated',
        todos: todos
    });
});


app.listen(5050, () => {
    console.log('Listening to port 5050');
})