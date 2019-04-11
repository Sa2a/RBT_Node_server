//import {Supervisor} from "../entity/Supervisor";
const Supervisor = require('../entity/Supervisor').Supervisor;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");
const Report = require('../entity/Report').Report;



let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    await adminRep.save(report);
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
    check_supervisor

}