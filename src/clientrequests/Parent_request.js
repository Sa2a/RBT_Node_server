
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
app.post('/add_report', async (req, res) => {
    let repo = new Repo();
    repo.content =req.body[0].content;
    repo.dateTime = req.body[0].Date;
    repo.User_mail = req.body[0].email;
    repo.receiver_mail_or_id = "Admin";
    repo.Ishidden=false ;
    repo.first_time=false ;
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

})})
//display
app.get('/display_info',async(req,res)=>{
        let email=req.body.email;
        Parent_cont.display_info(email).then(result=>{
        res.send(result);

    })
});

//log in

app.post('/log_in', async (req,res)=>{

    let x=false;
    console.log("Successful");
    Parent_cont.check_parent(req.body.email,req.body.password).then(result=>{
        if(result!=false){res.send(result);x=true;}
       });
    supervisor_cont.check_supervisor(req.body.email,req.body.password).then(result=>{
        if(result!=null){res.send(result);x=true;}
    });
    driver_cont.check_driver(req.body.email,req.body.password).then(result=>{
        if(result!=null){res.send(result);x=true;}
        if(x===false){res.send({error:"UserName or password is not valid "});}

    })
    });
app.post('/show_notification',async (req,res)=>{
    Parent_cont.notification().then(result=>{

        Parent_cont.check_answer(req.body[0].email).then(r=> {
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
app.post('/child_info',async (req,res)=>{
    console.log(req.body);
    Parent_cont.show_mychildren_information(req.body[0].email).then(result=>{

        res.send(result);
        })

});
app.post('/driver_info',async (req,res)=>{
    Parent_cont.show_driver_information(req.body[0].driver_username).then(result=>{
        console.log(result);
        res.send(result);
    })
});
