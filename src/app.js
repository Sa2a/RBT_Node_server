const md= require('reflect-metadata');

const session = require('express-session');
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
let createConnection = require("typeorm").createConnection();

createConnection.then(()=> {
    let location = path.join(__dirname,"../public");
    console.log(location);
    let app = express();
    app.use(express.static(location));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({secret: "secret", saveUninitialized: true, resave: false}));
    /*
    Access to XMLHttpRequest at 'http://localhost:5000/campaign'
    from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight
     request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present
     on the requested resource.*/
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
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

    const admin = require("./clientrequests/Admin_request");
    const parent = require("./clientrequests/Parent_request");
    const supervisor = require("./clientrequests/Supervisor_requests");
    const driver = require("./clientrequests/Driver_requests");


}).catch(error => {
    console.log(error);
});



