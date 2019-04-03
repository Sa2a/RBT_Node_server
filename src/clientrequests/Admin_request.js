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
        if(result==false){res.send(false)}
        else {
            if (req.body.user.userType.localeCompare("Admin")) {
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
            else if(req.body.user.userType.localeCompare("Supervisor")){
                let supervisor=new super_vis();
                supervisor.id=req.body.user.id;
                supervisor.firstName=req.body.user.firstName;
                supervisor.lastName=req.body.user.lastName;
                supervisor.username=supervisor.firstName+"_"+supervisor.lastName;
                supervisor.password=req.body.user.password;
                supervisor.contactNumber=req.body.user.contactNumber;
                supervisor.dateOfBirth=req.body.user.DayOfBirth+req.body.user.MonthOfBirth+req.body.user.yearofBirth;
                supervisor.email=req.body.user.email;
                supervisor.nationalNumber=req.body.user.nationalNumber;
                Admin_cont.add_superavisor(supervisor);
            }
            else if(req.body.user.userType.localeCompare("Driver")){
                let driver=new driv();
                driver.id=req.body.user.id;
                driver.firstName=req.body.user.firstName;
                driver.lastName=req.body.user.lastName;
                driver.username=driver.firstName+"_"+driver.lastName;
                driver.password=req.body.user.password;
                driver.contactNumber=req.body.user.contactNumber;
                driver.dateOfBirth=req.body.user.DayOfBirth+req.body.user.MonthOfBirth+req.body.user.yearofBirth;
                driver.email=req.body.user.email;
                driver.nationalNumber=req.body.user.nationalNumber;

                Admin_cont.add_driver(driver);
            }
            else{
                let add=Admin_cont.add_parent(addmin);

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


/*app.get('/get_add_parent', async (req, res) => {
    let p=new parent();
    p.id=req.id;
    p.username=req.body.username;
    p.password=req.body.password;

    p.email=req.body.email;
    p.contactNumber=req.body.contactNumber;
    p.nationalNumber=req.body.nationalNumber;
    p.firstName=req.body.firstName;
    p.lastName=req.body.lastName;
    p.dateOfBirth=req.body.dateOfBirth;
    let check=Admin_cont.check_admins_supervisor_driver_parent_student(p.id).then((result)=>{
        if(result==false){res.send(false)}
        else{
            let add=Admin_cont.add_parent(p);
            res.send(true);
        }
    })


});

app.get('/get_add_supervisor', async (req, res) => {
    let sup_vis=new super_vis();
    sup_vis.id=req.id;
    sup_vis.username=req.body.username;
    sup_vis.password=req.body.password;
    sup_vis.firstName=req.body.firstName;
    sup_vis.lastName=req.body.lastName;
    sup_vis.email=req.body.email;
    sup_vis.nationalNumber=req.body.nationalNumber;
    sup_vis.dateOfBirth=req.body.dateOfBirth;
    sup_vis.contactNumber=req.body.contactNumber;
    sup_vis.bus=req.body.bus;

    let check=Admin_cont.check_admins_supervisor_driver_parent_student(sup_vis.id).then((result)=>{
        if(result==false){res.send(false)}
        else{
    let add=Admin_cont.add_superavisor(sup_vis);
    res.send(add.then());
        }
    })
});

app.post('/get_add_driver', async (req, res) => {
    let driver=new driv();
    driver.id=req.id;
    driver.username=req.body.username;
    driver.password=req.body.password;
    driver.firstName=req.body.firstName;
    driver.lastName=req.body.lastName;
    driver.dateOfBirth=req.body.dateOfBirth;
    driver.email=req.body.email;
    driver.contactNumber=req.body.contactNumber;
    driver.nationalNumber=req.body.nationalNumber;
    driver.bus=req.body.bus;

    let check=Admin_cont.check_admins_supervisor_driver_parent_student(sup_vis.id).then((result)=>{
        if(result==false){res.send(false)}
        else{
            let add=Admin_cont.add_driver(driver);
            res.send(add);
        }
    })
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

app.get('/login',async  (req,res)=>{
    Admin_cont.check_adimn().then (
        (result=>{
            if(result==true){
              req.session.success=true;
            }
            else {
                req.session.success=false;
            }
        })
    )
})