const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const Repo=require("../entity/Report").Report;
const attend=require("../entity/Attendance").Attendance;
const supervisor_cont = require( "../databaserequests/Supervisor_controller");



app.post('/show_notification_supervisor',async (req,res)=>{
        supervisor_cont.notification(req.body[0].Type_of_user).then(result=>{
        console.log(result);
        supervisor_cont.check_answer(req.body[0].email).then(r=> {
            if (r==true&&result != null) {
                let s={reportsAnswers:true};
                result.push(s);
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

app.post('/add_report_supervisor', async (req, res) => {
    let repo = new Repo();
    repo.content=req.body.content;
   repo.dateTime = req.body.Date;
   let id= await supervisor_cont.get_supervisor_id(req.body.email);
    let sup_vis=await supervisor_cont.get_supervisor(id);
    repo.User_mail = req.body.email;
    repo.supervisor=sup_vis;
    repo.User_mail = req.body.email;
    repo.receiver_mail_or_id = "Admin";
    repo.Ishidden=false ;
    repo.first_time=false ;
    repo.type_of_user="supervisor" ;


    supervisor_cont.add_report(repo).then(result => {
        if(result!=null) {
            res.send({msg: "success"});
        }
        else{
            res.send({msg: "fail"});
        }
    });
});

app.post('/review_answer_supervisor',async  (req,res)=>{
    supervisor_cont.Display_answer(req.body[0].email).then(result=>{
        if(result==false){res.send("No answer yet");}
        else{res.send(result);
        }
    });});
app.post('/delete_repo_supervisor',async(req,res)=>{

    supervisor_cont.delete_repo(req.body[0].email).then(result=>{res.send([{res:result}])});

});


app.post('/get_students_related',async (req,res)=>{
supervisor_cont.Students_related_to_supervisor(req.body[0].email).then(
    result=>{  console.log(result);res.send(result)});

})

app.post('/take_attendance',async(req,res)=>{
     for(let i=0;i<req.body.length;i++) {
        let attends = new attend();
       attends.date_Time=req.body[i].date;
        attends.student_name=req.body[i].name;
        attends.student=await supervisor_cont.find_student(req.body[i].id);
        attends.status=req.body[i].absent;
       await supervisor_cont.add_attendance(attends);
      // attends.email=await supervisor_cont.parents_related(req.body[i].id);
    }
     let arr=[];
     arr.push({msg:"success"});
     console.log(arr);
    res.send(arr);

})
/*
app.post('/parent_rel',async (req,res)=>{
    supervisor_cont.parents_related(req.body[0].id).then(result =>{
      res.send(result);
    })
})*/