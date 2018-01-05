var express = require('express'),
    app=express(),
    PORT=3000;

// todos api routes
var todoRoutes = require('./routes/todos');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//path to index.html
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname + '/public'));
//root route
app.get('/', function(req,res){
    res.sendFile('index.html');
});

//api routes file
app.use('/api/todos',todoRoutes);

app.listen(PORT,function() {
    console.log('App Is Running on port '+PORT);
});