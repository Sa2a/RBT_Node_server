const Admin = require('../entity/Admin').Admin;
const Driver = require('../entity/Driver').Driver;
const bus = require('../entity/Bus').Bus;
const Student = require('../entity/Student').Student;
const Supervisor =require('../entity/Supervisor').Supervisor;
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
    await adminRep.save(report);
}

let check_parent=async function(email,password){
    let parRep=await connection.getRepository(Parent);
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
    check_parent
};