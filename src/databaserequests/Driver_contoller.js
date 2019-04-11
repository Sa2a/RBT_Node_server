//import {Driver} from "../entity/Driver";

const Driver = require('../entity/Driver').Driver;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");





let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    await adminRep.save(report);
}

let check_driver=async function(email,password){
    let parRep=await connection.getRepository(Driver);
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
    check_driver

}