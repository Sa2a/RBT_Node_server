const Admin_cont = require( "../databaserequests/Admin_controller");
const ad_=require("../entity/Admin").Admin;
const student=require("../entity/Student").Student;
const parent=require("../entity/Parent").Parent;
const super_vis=require("../entity/Supervisor").Supervisor;
const driv=require("../entity/Driver").Driver;
const bus=require("../entity/Bus").Bus;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const session = require('express-session');



app.post('/add_user', async (req, res) => {
    console.log(req.body);

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
                addmin.dateOfBirth= new Date(req.body.user.yearOfBirth, req.body.user.MonthOfBirth, req.body.user.DayOfBirth);
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
                supervisor.dateOfBirth= new Date(req.body.user.yearOfBirth, req.body.user.MonthOfBirth, req.body.user.DayOfBirth);
                supervisor.email=req.body.user.email;
                supervisor.nationalNumber=req.body.user.nationalNumber;
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
                driver.dateOfBirth= new Date(req.body.user.yearOfBirth, req.body.user.MonthOfBirth, req.body.user.DayOfBirth);
                driver.email=req.body.user.email;
                driver.nationalNumber=req.body.user.nationalNumber;

                Admin_cont.add_driver(driver);
               res.send({user: driver});
            }
            else{
                let par=new parent();
                par.id=req.body.user.id;
                par.firstName=req.body.user.firstName;
                par.lastName=req.body.user.lastName;
                par.username=par.firstName+"_"+par.lastName;
                par.password=req.body.user.password;
                par.contactNumber=req.body.user.contactNumber;
                par.dateOfBirth= new Date(req.body.user.yearOfBirth, req.body.user.MonthOfBirth, req.body.user.DayOfBirth);
                par.email=req.body.user.email;
                par.nationalNumber=req.body.user.nationalNumber;
                Admin_cont.add_parent(par);
               res.send({user:par});
            }

        }
    })

});

//add student
app.post('/get_add_student', async (req, res) => {
    let stud=new student();
    stud.id=req.body.id;
    stud.name=req.body.name;
    stud.parent=req.body.parent;
    stud.age=req.body.age;
    stud.attendances=req.body.attendances;
    stud.bus=req.body.bus;
    stud.classNumber=req.body.classNumber;
    stud.level=req.body.level;
    stud.dateOfBirth=req.body.dateOfBirth;
    stud.pickupCoordinate=req.body.pickupCoordinate;
    stud.supervisor=req.body.supervisor;
    let check=Admin_cont.check_admins_supervisor_driver_parent_student(stud.id).then((result)=>{
        if(result==false){res.send(false)}
        else{
            let add=Admin_cont.add_student(stud);
            res.send(add);
        }
    })

});



app.post('/get_add_bus', async (req, res) => {
    let buses=new bus();
    buses.id=req.id;
    buses.routePath=req.body.routePath;
    buses.bus_numbers=req.body.bus_numbers;

    let add=Admin_cont.add_buses(buses);
    res.send(add);
});

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
app.get('/review_reports', async (req, res) => {

    Admin_cont.review_reports().then((result)=>{
        console.log(result);
        res.send(result);
    });
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