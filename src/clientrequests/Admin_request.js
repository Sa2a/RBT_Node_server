//import {Supervisor} from "../entity/Supervisor";

//import {Report} from "../entity/Report";

//import {Report} from "../entity/Report";

const Admin_cont = require( "../databaserequests/Admin_controller");
const ad_=require("../entity/Admin").Admin;
const student=require("../entity/Student").Student;
const parent=require("../entity/Parent").Parent;
const super_vis=require("../entity/Supervisor").Supervisor;
const driv=require("../entity/Driver").Driver;
const bus=require("../entity/Bus").Bus;
const report=require("../entity/Report").Report;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const session = require('express-session');



app.post('/add_user', async (req, res) => {


        Admin_cont.check_admins_supervisor_driver_parent_student(req.body.user.email).then((result)=>{
        if(result==false){res.send({user:null});}
        else {
          if (req.body.user.userType ==="admin") {
                let addmin=new ad_();
                addmin.id=req.body.user.id;
                addmin.firstName=req.body.user.firstName;
                addmin.lastName=req.body.user.lastName;
                addmin.username=addmin.firstName+"_"+addmin.lastName;
                addmin.password=req.body.user.password;
                addmin.contactNumber=req.body.user.contactNumber;
                addmin.dateOfBirth= req.body.user.dateOfBirth;
                addmin.email=req.body.user.email;
                addmin.nationalNumber=req.body.user.nationalNumber;
                 Admin_cont.add_admin(addmin);
                res.send({user: addmin});
            }
            else if(req.body.user.userType=== "supervisor"){
                let supervisor=new super_vis();
                supervisor.id=req.body.user.id;
                supervisor.firstName=req.body.user.firstName;
                supervisor.lastName=req.body.user.lastName;
                supervisor.username=supervisor.firstName+"_"+supervisor.lastName;
                supervisor.password=req.body.user.password;
                supervisor.contactNumber=req.body.user.contactNumber;
                supervisor.dateOfBirth= req.body.user.dateOfBirth;
                supervisor.email=req.body.user.email;
                supervisor.nationalNumber=req.body.user.nationalNumber;
                Supervisor.Type_of_user=Supervisor;
                Admin_cont.add_superavisor(supervisor);
               res.send({user: supervisor});
            }
            else if(req.body.user.userType === "driver"){
                let driver=new driv();
                driver.id=req.body.user.id;
                driver.firstName=req.body.user.firstName;
                driver.lastName=req.body.user.lastName;
                driver.username=driver.firstName+"_"+driver.lastName;
                driver.password=req.body.user.password;
                driver.contactNumber=req.body.user.contactNumber;
                driver.dateOfBirth= req.body.user.dateOfBirth;
                driver.email=req.body.user.email;
                driver.nationalNumber=req.body.user.nationalNumber;
                driver.Type_of_user="driver";

            Admin_cont.add_driver(driver);
               res.send({user: driver});
            }
            else if(req.body.user.userType === "Student"){
              let stud=new student();
              stud.name=req.body.name;
              stud.parent_mail=req.body.parent_mail;
              stud.age=req.body.age;
              stud.bus=req.body.bus;
              stud.classNumber=req.body.classNumber;
              stud.level=req.body.level;
              stud.dateOfBirth=req.body.user.dateOfBirth;
              Admin_cont.add_student(stud).then(result=>{
                  res.send(result);
              });
          }
            else{
                let par=new parent();
                par.id=req.body.user.id;
                par.firstName=req.body.user.firstName;
                par.lastName=req.body.user.lastName;
                par.username=par.firstName+"_"+par.lastName;
                par.password=req.body.user.password;
                par.contactNumber=req.body.user.contactNumber;
                par.dateOfBirth= req.body.user.dateOfBirth;
                par.email=req.body.user.email;
                par.nationalNumber=req.body.user.nationalNumber;
                Admin_cont.add_parent(par);
                 par.Type_of_user=req.body.user.UserType;

            res.send({user:par});
            }

        }
    })

});

//add student
/*app.get('/get_add_student', async (req, res) => {
    let stud=new student();
    stud.name=req.body.name;
    stud.parent_mail=req.body.parent_mail;
    stud.age=req.body.age;
    stud.bus=req.body.bus;
    stud.classNumber=req.body.classNumber;
    stud.level=req.body.level;
    stud.dateOfBirth= new Date(req.body.user.yearOfBirth, req.body.user.MonthOfBirth, req.body.user.DayOfBirth);

            Admin_cont.add_student(stud).then(result=>{
                res.send(result);
            });



});

*/

app.post('/get_add_bus', async (req, res) => {
    let buses=new bus();
    buses.id=req.id;
    buses.routePath=req.body.routePath;
    buses.bus_numbers=req.body.bus_numbers;

    let add=Admin_cont.add_buses(buses);
    res.send(add);
});
/*
app.get('/get_find_admins', async (req, res) => {

    Admin_cont.get_admins().then((result)=>{
        console.log(result);
        res.send(result);

    });

});

app.get('get_find_parents',async (req,res)=>
{
    Admin_cont.getparents().then((result) => {
        console.log(result);
        res.send(result);
    })
})
app.get('get_find_drivers',async (req,res)=>
{
    Admin_cont.getdrivers().then((result) => {
        console.log(result);
        res.send(result);
    })
})
app.get('get_find_supervisors',async (req,res)=>
{
    Admin_cont.getsupervisor().then((result) => {
        console.log(result);
        res.send(result);
    })
})
*/
app.get('/review_reports', async (req, res) => {

    Admin_cont.review_reports().then((result)=>{
        console.log(result);
        res.send(result);
    });
});
app.get('/add_resp',async(req,res)=>{
   let repo=new report();
   repo.type=req.body.type;
   repo.content=req.body.content;
   repo.receiver_mail_or_id=req.body.email;
   repo.User_mail="admin";
   Admin_cont.add_report(repo).then(result=>{
       res.send(result);
   })
});
app.post('/login',async  (req,res)=>{
    Admin_cont.check_adimn(req.body.email,req.body.password).then (
        (result=>{
            if(result!=null){
              req.session.user=result;
                res.send({ user: result});
            }
            else {
                res.send({ user: null});
            }
        })
    )
});

app.post('/find_user',async (req,res)=>{
        if(req.body.type==="email"){
            Admin_cont.find_user_by_email(req.body.email,req.body.usertype).then(result=> {
                if (result != null) {
                    res.send({user: result});
                } else {
                    res.send({user: null});
                }
            })
        }
        else if (req.body.type==="address"){
            Admin_cont.find_user_by_address(req.body.address,req.body.usertype).then(result=>{
                if(result!=null){
                    res.send({user:result});
                }
                else {
                    res.send({user:null});
                }
            })
        }
        else if(req.body.type==="contact_number"){
            Admin_cont.find_user_by_contact_number(req.body.address,req.body.usertype).then(result=>{
                if(result!=null){
                    res.send({user:result});
                }
                else {
                    res.send({user:null});
                }

            })
        }
        else if(req.body.type==="username"){
            Admin_cont.find_user_by_username(req.body.username,req.body.usertype).then(result=>{
                if(result!=null){
                    res.send({user:result});
                }
                else {
                    res.send({user:null});
                }
            })
        }
})

app.post('/add_answer',async (req,res)=>{
   Admin_cont.find_and_update_report("req.body.email","req.body.answer").then(result=>{res.send(result)})
});

app.post('/notification',async (req,res)=>{
  let repo=new report();
  repo.type=req.body.type;
  repo.content="general";
  repo.User_mail="admin";
  repo.receiver_mail_or_id="parents";
  Admin_cont.add_report(repo).then(result=>{
      res.send(result);
  })

});