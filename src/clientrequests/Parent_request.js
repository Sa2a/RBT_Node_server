
const Parent_cont = require( "../databaserequests/Parent_controller");
const supervisor_cont = require( "../databaserequests/Supervisor_controller");
const driver_cont = require( "../databaserequests/Driver_contoller");
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

app.post('/log_in', async (req,res)=>{

    var x=false;
    console.log("Successful");
    Parent_cont.check_parent(req.body.email,req.body.password).then(result=>{
        if(result!=null){
       res.send(result);
        x=true;}

       });
    supervisor_cont.check_supervisor(req.body.email,req.body.password).then(result=>{
        if(result!=null){
            res.send(result);
            x=true;
        }
    })
    driver_cont.check_driver(req.body.email,req.body.password).then(result=>{
        if(result!=null){
            res.send(result);
            x=true;
        }
        if(x===false){
            res.send(result);
        }

    })


    });




