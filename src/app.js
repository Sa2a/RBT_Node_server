const md= require('reflect-metadata');

const session = require('express-session');
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
let createConnection = require("typeorm").createConnection();

const http = require("http");
const socketIo = require("socket.io");



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


    const port = process.env.PORT || 5001;
   /* const index = require("./clientrequests/testio");
    app.use(index);*/
    const server = http.createServer(app);
    const io = socketIo(server); // < Interesting!

    server.listen(port, () => console.log(`Socket io Listening on port ${port}`));
// firebase
    let admin = require("firebase-admin");
    let serviceAccount = require("./../serviceAccountKey");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://realtimebustracking-8ad63.firebaseio.com"
    });

    let db = admin.database();
    module.exports ={
        app,path,
        db,
        io
    };

    require("./clientrequests/Admin_request");
    require("./clientrequests/Parent_request");
    require("./clientrequests/Supervisor_requests");
    require("./clientrequests/Driver_requests");
    require("./clientrequests/Tracking");


}).catch(error => {
    console.log(error);
});



