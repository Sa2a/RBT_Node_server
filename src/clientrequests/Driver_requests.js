const driv=require("../entity/Driver").Driver;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const Repo=require("../entity/Report").Report;
const driver_cont = require( "../databaserequests/Driver_contoller");







app.get('/add_report', async (req, res) => {
    let repo=new Repo();
    repo.id=req.body.id;
    repo.content=req.body.content;
    repo.type=req.body.type;
    let add=driver_cont.add_report(repo);
    res.send(repo);
});
