const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");





let add_report=async function(report)
{
    let adminRep = await connection.getRepository(Report);
    await adminRep.save(report);
}











module.exports={
add_report,

}