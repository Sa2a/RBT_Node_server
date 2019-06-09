const Admin = require('../entity/Admin').Admin;
const Driver = require('../entity/Driver').Driver;
const bus = require('../entity/Bus').Bus;
const Student = require('../entity/Student').Student;
const Supervisor =require('../entity/Supervisor').Supervisor;
const absen =require('../entity/Attendance').Attendance;
const Report = require('../entity/Report').Report;
const Parent = require('../entity/Parent').Parent;
const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");

let event = new eventEmitter();


let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    let r=await adminRep.save(report);

    return r;
}

let check_parent=async function(email,password){
    let parRep=await connection.getRepository(Parent);
    let existed = await parRep.findOne({email:email,password:password});
    if(existed!=null) {
        return existed;
    }
        else {
            return false;
    }

    };

let display_info=async function (email){
    let stud_info=await  connection.getRepository(Student);
    let find_stud=await stud_info.find({parent_mail:email});
    return find_stud;
}
let delete_repo=async function(email){
    let res=await connection.getRepository(Report);

        let updated= await res.createQueryBuilder().update(res).set({Ishidden: true}).where({User_mail:email,Ishidden:false}).execute();

    return true;
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

let notification =async function(){
  let not= await connection.getRepository(Report);
  let notification =await not.find({receiver_mail_or_id:"parents"});
  return notification;

};

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
let show_mychildren_information=async function(email){
    let children=await  connection.getRepository(Student);
    let child_info=await children.find({parent_mail:email});
    return child_info;
};
let show_driver_information=async function(username){
    let driver=await  connection.getRepository(Driver);
    let driver_info=await driver.find({username:username});
 for(let i=0;i<driver_info.length;i++){
         driver_info[i].password=null;
 }
    return driver_info;
};

let check_absense=async function(email){
    let absence=await connection.getRepository(absen);
    let mychildren_abs=await absence.find({email:email,status:false});
    return mychildren_abs;

}
module.exports={
  add_report,
    check_parent,
    display_info,
    Display_answer,
    notification,
    show_mychildren_information,
    show_driver_information,
    check_answer,
    delete_repo,
    check_absense

};