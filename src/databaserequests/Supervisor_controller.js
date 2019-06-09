//import {Supervisor} from "../entity/Supervisor";
const Supervisor = require('../entity/Supervisor').Supervisor;
const student = require('../entity/Student').Student;
const attendance = require('../entity/Attendance').Attendance;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");
const Report = require('../entity/Report').Report;



let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    await adminRep.save(report);
    return report;
}

let notification =async function(){
    let not= await connection.getRepository(Report);
    let notification =await not.find({receiver_mail_or_id:"Supervisor"});
    return notification;

};
let delete_repo=async function(email){
    let res=await connection.getRepository(Report);

    await res.createQueryBuilder().update(res).set({Ishidden: true}).where({User_mail:email,Ishidden:false}).execute();

    return true;
}
let check_answer=async function(email){
    console.log(email);
    let check=await connection.getRepository(Report);
    let notification =await check.find({User_mail:email,Ishidden:false});
    let x=false;
    for(let i=0;i<notification.length;i++) {
        console.log(notification[i]);
        if (notification[i].answer != ""&&notification[i].first_time==false) {
            let update = await check.createQueryBuilder().update(Report)
                .set({first_time: true})
                .where({id: notification[i].id})
                .execute();
            x=true;
        }
    }
    if(x==true) {return true;}
    return false;
}

let Display_answer=async  function(email){
    let res=await connection.getRepository(Report);
    let ans=await res.find({User_mail:email,Ishidden:false});
    let final=[];
    if(ans==null){
        return false ;
    }
    else {

        for ( let i = 0;i < ans.length;i++) {

            if (ans[i].answer != "") {

                final.push(ans[i]);
            }
        }}
    /* let updated= await res.createQueryBuilder().update(res).set({Ishidden: true}).where({User_mail:email,Ishidden:false}).execute();*/

    return final;

}

let Students_related_to_supervisor=async function(email){
    let std=await connection.getRepository(student);
    let student_indo=std.find({supervisor_mail:email});
    if(student_indo!=null) {
        return student_indo;
    }
        return false;
}

let add_attendance=async function(students){
    let add=await connection.getRepository(attendance);
    for(let i=0;i<students.length;i++) {
        console.log(students[i]);
        await add.save(students[i]);
    }
   return true;
}

let check_supervisor=async function(email,password){
    let parRep=await connection.getRepository(Supervisor);
    let existed = await parRep.findOne({email:email,password:password});
    if(existed!=null) {
        return existed;
    }
    else {
        return null;
    }
}










module.exports={
add_report,
    notification,
    check_answer,
    delete_repo,
    Display_answer,
    Students_related_to_supervisor,
    add_attendance,
    check_supervisor

}