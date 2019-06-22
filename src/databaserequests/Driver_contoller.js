const Driver = require('../entity/Driver').Driver;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;



let get_driver=async function(id){
    let driver=await connection.getRepository(Driver);
    let driver_spec=await driver.findOne({id:id});
    return driver_spec;
}



let check_driver=async function(email,password){
    let parRep=await connection.getRepository(Driver);
    let existed = await parRep.findOne({email:email,password:password});
    if(existed!=null) {
        existed.username=existed.email;
        return existed;
    }
    else {
        return null;
    }

}


/*

let notification =async function(){
    let not= await connection.getRepository(Report);
    let notification =await not.find({receiver_mail_or_id:"Driver"});
    return notification;

};
*/



module.exports={
add_report,
    check_driver,
    notification,
    Display_answer,

}