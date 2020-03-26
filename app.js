var express = require("express"); //pull in the express dependency
var app = express(); // app is the primary variable
var bodyParser = require("body-parser"); //to post data we need body parser
//temp database like an object
var books = [{
        id: 1,
        name: "book1"
    },
    {
        id: 2,
        name: "book2"
    }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


//define route
app.get('/books', function (req, res) {
    // default method is GET so we dont have to define it
    res.send({
        books: books
    });
});

//post method
app.post('/books', function (req, res) {
    var bookName = req.body.name;
    /*we did body.name since we have declared data: JSON.stringify({name:createInpt.val()})*/
    currentId++;

    //push the data in temp database
    books.push({
        id: currentId,
        name: bookName
    });
    res.send('Successfully created  a new book!');

});

//put method
app.put('/books/:id', function (req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    console.log(newName);
    console.log(id + ' got from the server side. ');

    var found = false; //for iteration
    books.forEach(function (book, index) {
        if (!found && (book.id === Number(id))) {
            book.name = newName;
        }
    });
    res.send('Successfully updated!');
});

//delete method
app.delete('/books/:id', function (req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    console.log(newName);
    console.log(id + ' got from the server side. ');

    var found = false; //for iteration
    books.forEach(function (book, index) {
        if (!found && (book.id === Number(id))) {
            books.splice(index, 1); //to delete at that index

        }
    });
    res.send('Successfully deleted!');
});


app.listen(PORT, function () {
    console.log('Server listening on port number ' + PORT);
});