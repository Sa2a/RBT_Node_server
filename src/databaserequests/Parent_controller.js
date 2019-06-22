const Driver = require('../entity/Driver').Driver;
const Student = require('../entity/Student').Student;
const absen =require('../entity/Attendance').Attendance;
const Report = require('../entity/Report').Report;
const Parent = require('../entity/Parent').Parent;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;

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
    let notification =await not.find({receiver_mail_or_id:"Parents"});
    return notification;

};

let get_parent_id=async function(email){
    let par=await connection.getRepository(Parent);
    let par_info=await par.findOne({email:email});
    return par_info.id;
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
let show_mychildren_information=async function(email){
    let parent=await connection.getRepository(Parent);
    let paren_of_my_child=await parent.find({
        relations:['students'],
        select : ['username'],
        where:[{email : email} ]
    });
    return paren_of_my_child[0].students;
};
let show_driver_information=async function(email){

    let parent=await connection.getRepository(Parent);
    let driver=await connection.getRepository(Driver);
    let par_id=await parent.find({email:email});

    let stude=await connection.getRepository(Student);
    let child=await stude.findOne({
        relations:['parent','bus'],
        where:[{parentId : par_id.id} ]
    });
    let bus_and_driver_info=[];
    bus_and_driver_info.push(child);
    let bus_info=bus_and_driver_info[0].bus;
    console.log(bus_info);
    let driv=await driver.findOne({
        relations:['bus'],
        where:[{busId:bus_info.id} ]
    });
driv.bus_numbers=bus_info.bus_numbers;
    return driv;
};
let get_parent=async function(id){
    let s=await connection.getRepository(Parent);
    let sup=s.findOne({id:id});
    return sup;
}
let check_absense=async function(email){
    let absence=await connection.getRepository(absen);
    let stude=await show_mychildren_information(email);
    let attendance ;
    for(let i=0;i<stude.length;i++) {
        console.log(stude[i].name);
         attendance=await absence.find({
            where:[{studentId:stude[i].id}]
        });
    }
    return attendance;
}
module.exports={
  add_report,
    check_parent,
    Display_answer,
    notification,
    show_mychildren_information,
    show_driver_information,
    check_answer,
    delete_repo,
    check_absense,
    get_parent,
    get_parent_id

};