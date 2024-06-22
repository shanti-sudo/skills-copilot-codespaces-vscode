// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// read data from file
let data = fs.readFileSync('./data.json');
let comments = JSON.parse(data);

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// show all comments
app.get('/', (req, res) => {
    res.render('index', {comments: comments});
});

// add new comment
app.post('/add', (req, res) => {
    let comment = req.body.comment;
    comments.push(comment);

    // save to file
    fs.writeFileSync('./data.json', JSON.stringify(comments));

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});