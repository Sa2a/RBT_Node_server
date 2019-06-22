const Supervisor = require('../entity/Supervisor').Supervisor;
const student = require('../entity/Student').Student;
const attendance = require('../entity/Attendance').Attendance;
const Parent = require('../entity/Parent').Parent;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const Report = require('../entity/Report').Report;



let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    await adminRep.save(report);
    return report;
}

let notification =async function(){
    let not= await connection.getRepository(Report);
    let notification =await not.find({receiver_mail_or_id:"supervisor"});
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
let get_supervisor=async function(id){
    let s=await connection.getRepository(Supervisor);
    let sup=s.findOne({id:id});
    return sup;
}
let get_supervisor_id=async function(email){
    let s=await connection.getRepository(Supervisor);
    let sup=s.findOne({email:email});
    return sup.id;
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

    return final;

}
/*
let  parents_related=async function(id){
    let st=await connection.getRepository(student);
    let par=await connection.getRepository(Parent);

    let stud=await st.findOne({relation:['parent'],where:[{id:id}]});
    let  paren=await par.findOne({relation: ['students'],where:[{students:stud}]

    })
    return paren;
}*/
let Students_related_to_supervisor=async function(email){
    let std=await connection.getRepository(student);
    let super_viso=await connection.getRepository(Supervisor);

    let supervisor_info=super_viso.find({supervisor_mail:email});
    if(supervisor_info!=null) {
        let arr=[];
        let supervis=await std.find({relation:['supervisor'],where:[{supervisorId:supervisor_info.id}]});
        for(let i=0;i<supervis.length;i++){
            arr.push(supervis[i]);
        }
        return arr;
    }
        return false;
}

let add_attendance=async function(students){
    let add=await connection.getRepository(attendance);
    await add.save(students);
}
let find_student=async function(id){
    let stud=await connection.getRepository(student);
    let students=await stud.findOne({id:id});
    return students;
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

let get_parent=async function(parent){
    let par=await connection.getRepository(Parent);
    let pare=par.findOne({Parent:parent});
    return pare;
}








module.exports={
add_report,
    notification,
    check_answer,
    delete_repo,
    Display_answer,
    Students_related_to_supervisor,
    find_student,
    add_attendance,
    check_supervisor,
    get_parent,
    get_supervisor,
    parents_related,
    get_supervisor_id

}