const Parent_cont = require( "../databaserequests/Parent_controller");
const ad_=require("../entity/Admin").Admin;
const student=require("../entity/Student").Student;
const parent=require("../entity/Parent").Parent;
const super_vis=require("../entity/Supervisor").Supervisor;
const driv=require("../entity/Driver").Driver;
const Repo=require("../entity/Report").Report;
const bus=require("../entity/Bus").Bus;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;

//add report
app.get('/add_report', async (req, res) => {
    let repo=new Repo();
    repo.id=req.body.id;
    repo.content=req.body.content;
    repo.type=req.body.type;
    let add=Parent_cont.add_report(repo);
    res.send(repo);
});

//log in

app.get('/log_in_parent', async (req,res)=>{
    let p=new parent();
    p.id=req.id;
    p.username=req.username;
    p.password=req.password;
    let pr=Parent_cont.check(p).then(result=>{
        if(result!=null){
       res.send(result);}
        else{res.send(false)};
    });

});


