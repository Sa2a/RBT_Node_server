const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const Repo=require("../entity/Report").Report;
const attend=require("../entity/Attendance").Attendance;
const supervisor_cont = require( "../databaserequests/Supervisor_controller");





app.post('/show_notification',async (req,res)=>{
    supervisor_cont.notification().then(result=>{

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
app.post('/add_report', async (req, res) => {
    let repo = new Repo();
    repo.content =req.body[0].content;
    repo.dateTime = req.body[0].Date;
    repo.User_mail = req.body[0].email;
    repo.receiver_mail_or_id = "Admin";
    repo.Ishidden=false ;
    repo.first_time=false ;
    supervisor_cont.add_report(repo).then(result => {
        if(result!=null) {
            res.send({msg: "success"});
        }
        else{
            res.send({msg: "fail"});
        }
    });
});
app.post('/review_answer',async  (req,res)=>{
    supervisor_cont.Display_answer(req.body[0].email).then(result=>{
        if(result==false){res.send("No answer yet");}
        else{res.send(result);
        }
    });});
app.post('/delete_repo',async(req,res)=>{

    supervisor_cont.delete_repo(req.body[0].email).then(result=>{res.send([{res:result}])});

})
app.post('/get_students_related',async (req,res)=>{
    supervisor_cont.Students_related_to_supervisor(req.body[0].email).then(result=>{res.send(result)});
})
app.post('/attendance,async',async (req,res)=>{
    console.log(req.body);
   /* let attendance=new attend();
    attendance.dateTime=req.body[0].date;
    attendance.status=req.body[0].status;
    attendance.student_name=req.body[0].student_name;
    attendance.email=req.body[0].parent_mail;*/
    supervisor_cont.add_attendance(req.body).then(result=>{res.send(result)});
})