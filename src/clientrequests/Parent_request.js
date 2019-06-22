const Parent_cont = require( "../databaserequests/Parent_controller");
const supervisor_cont = require( "../databaserequests/Supervisor_controller");
const driver_cont = require( "../databaserequests/Driver_contoller");
const ad_=require("../entity/Admin").Admin;
const student=require("../entity/Student").Student;
const parent=require("../entity/Parent").Parent;
const Attendance=require("../entity/Attendance").Attendance;
const super_vis=require("../entity/Supervisor").Supervisor;
const driv=require("../entity/Driver").Driver;
const Repo=require("../entity/Report").Report;
const bus=require("../entity/Bus").Bus;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;

//add report
app.post('/add_report', async (req, res) => {
    let repo = new Repo();
    repo.content=req.body.content;
    repo.dateTime = req.body.Date;
    let id=await Parent_cont.get_parent_id(req.body.email);
    let parent=await Parent_cont.get_parent(id);
    repo.User_mail = req.body.email;
    repo.parent=parent;
    repo.receiver_mail_or_id = "Admin";
    repo.Ishidden=false ;
    repo.first_time=false ;
    repo.type_of_user="parent" ;
    Parent_cont.add_report(repo).then(result => {
        if(result!=null) {
            res.send({msg: "success"});
        }
        else{
            res.send({msg: "fail"});
        }
        });
});
    app.post('/review_answer',async  (req,res)=>{
      Parent_cont.Display_answer(req.body[0].email).then(result=>{
          if(result==false){res.send("No answer yet");}
          else{res.send(result);
          }
      });});
    app.post('/delete_repo',async(req,res)=>{

        Parent_cont.delete_repo(req.body[0].email).then(result=>{res.send([{res:result}])});

    })

app.post('/check_abs',async(req,res)=>{

    Parent_cont.check_absense(req.body[0].email).then(result=>{res.send(result);
    console.log()
})})

//log in
app.post('/log_in', async (req,res)=>{
    var x=false;
    console.log("Successful");
   let result=await Parent_cont.check_parent(req.body.email,req.body.password);
        if (result != false) {
            let driver_info = await Parent_cont.show_driver_information(req.body.email);
            console.log(driver_info);
            result.username = driver_info.email;
            console.log(result);
            x = true;
            res.send(result);
        }

    let super_vis=await supervisor_cont.check_supervisor(req.body.email,req.body.password);
        if(super_vis!=null){res.send(super_vis);x=true;}

    let driv=await driver_cont.check_driver(req.body.email,req.body.password);
        if(driv!=null){x=true;res.send(driv);}

    if(x===false){res.send({error:"UserName or password is not valid "});}
})

app.post('/show_notification',async (req,res)=>{
    supervisor_cont.notification(req.body[0].Type_of_user).then(result=>{
        console.log(result);
        supervisor_cont.check_answer(req.body[0].email).then(r=> {
            if (r==true&&result != null) {
                let s={reportsAnswers:true};
                result.push(s);
                //  console.log(result);
                res.send(result);
            }
            else if (r==false&&result != null) {
                let s={reportsAnswers:false};
                result.push(s);
                //console.log(result);
                res.send(result);
            }
            else{res.send({error:"empty"})}
        })

    })
});
app.post('/child_info',async (req,res)=> {
    Parent_cont.show_mychildren_information(req.body[0].email).then(result=>{
console.log(result);
        res.send(result);
        })
});
app.post('/driver_info',async (req,res)=>{
    Parent_cont.show_driver_information(req.body[0].email).then(result=>{
        let arr_driv=[];
        arr_driv.push(result);
        console.log(arr_driv);
        res.send(arr_driv);
    })
});
