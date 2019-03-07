const md= require('reflect-metadata');
const session = require('express-session');
const express = require("express");
const bodyParser = require('body-parser');
let createConnection = require("typeorm").createConnection();
const path = require("path");

createConnection.then(()=> {
    let location = path.join(__dirname,"../public");
    console.log(location);
    let app = express();
    app.use(express.static(location));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({secret: "secret", saveUninitialized: true, resave: false}));

   /* app.set('views',location);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');
*/
    app.listen(5000,()=>{
        console.log("application has started on port 5000");
    });

    module.exports ={
        app,path
    };

    const test = require("./clientrequests/TestReact");

}).catch(error => {
    console.log(error);
});



