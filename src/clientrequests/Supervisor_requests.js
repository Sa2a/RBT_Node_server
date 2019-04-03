const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const Repo=require("../entity/Report").Report;
const supervisor_cont = require( "../databaserequests/Supervisor_controller");







app.get('/add_report', async (req, res) => {
    let repo=new Repo();
    repo.id=req.body.id;
    repo.content=req.body.content;
    repo.type=req.body.type;
    let add=supervisor_cont.add_report(repo);
    res.send(repo);
});
