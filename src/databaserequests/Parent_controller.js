const shuffle = require('shuffle-array');
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

let check=async function(par){
    let parRep=await connection.getRepository(Parent);
    let existed = await parRep.findOne(par.id);
    if(existed!=null){
        if(existed.username==par.username&&existed.password==par.password){
            return existed;
        }
        else {
            return 0;
    }

    }

}




module.exports={
  add_report,
    check
};