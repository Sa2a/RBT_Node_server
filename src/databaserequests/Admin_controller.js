const RoutePath = require("../entity/RoutePath").RoutePath;

const {IsNull, Not} = require('typeorm');

const Admin = require('../entity/Admin').Admin;
const Driver = require('../entity/Driver').Driver;
const Bus = require('../entity/Bus').Bus;
const student = require('../entity/Student').Student;
const bus_route = require('../entity/RoutePath').RoutePath;
const points = require('../entity/Coordinates').Coordinates;
const Supervisor = require('../entity/Supervisor').Supervisor;
const report = require('../entity/Report').Report;
const Parent = require('../entity/Parent').Parent;
require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");

let event = new eventEmitter();

// to add a new admin
let add_admin = async function (admin) {
    let adminRep = await connection.getRepository(Admin);
    let ad = await adminRep.save(admin);
    return await adminRep.findOne({id: ad.id});
}

// add a new student
let add_student = async function (stud) {
    let studentRep = await connection.getRepository(student);
    let studx = await studentRep.save(stud);
    return await studentRep.findOne({id: studx.id});
}
//add a new parent
let add_parent = async function (par) {
    let studentRep = await connection.getRepository(Parent);
    let parx = await studentRep.save(par);
    return await studentRep.findOne({id: parx.id});
}

//add a new supervisor
let add_superavisor = async function (sup) {
    let studentRep = await connection.getRepository(Supervisor);
    let s1 = await studentRep.save(sup);
    return await studentRep.findOne({id: s1.id});
}
let add_coord = async function (point) {
    let bus_route = await connection.getRepository(points);
    return await bus_route.save(point);
};
let add_route = async function (route) {
    let routePath = await connection.getRepository(bus_route);
    return await routePath.save(route);
}
//add a new driver
let add_driver = async function (drive) {
    let driver = await connection.getRepository(Driver);
    return await driver.save(drive);

}
//add bus
let add_buses = async function (bus) {
    let busRep = await connection.getRepository(Bus);
    return await busRep.save(bus);
};
//get all admins
let get_admins = async function () {
    let admin = await getConnection.getRepository(Admin);
    let Ad = await admin.find();
    return Ad;
};
//get all parents
let get_buses_with_coordinates = async function () {
    let busRepo = await getConnection.getRepository(Bus);
    let buses = await busRepo.find({
            relations: ['driver', 'supervisor', 'students', 'routePath', 'routePath.coordinates']
            , where: {routePath: Not(IsNull())}
        }
    );
    return buses;
}
let get_buses = async function () {
    let busRepo = await getConnection.getRepository(Bus);
    let buses = await busRepo.find({relations: ['driver', 'supervisor', 'students', 'routePath']});
    return buses;
}
let get_buses_without_routes = async function () {
    let busRepo = await getConnection.getRepository(Bus);
    let buses = await busRepo.find({where: {routePath: IsNull()}});
    return buses;
}


////get all drivers
let getdrivers = async function () {
    let DriverRepo = await getConnection.getRepository(Driver);
    let drivers = await DriverRepo.find({relations: ['bus']});
    return drivers;
}

////get all supervisor
let getsupervisor = async function () {
    let supervisorRepo = await getConnection.getRepository(Supervisor);
    let supervis = await supervisorRepo.find({relations: ['students', 'bus']});
    return supervis;
}
//review reports
let review_reports = async function () {
    let ParentRepo = await getConnection.getRepository(report);
    let repo = await ParentRepo.find();
    return repo;
};
//find report to answer
/*let find_and_update_report = async function (email, answer) {
    let ParentRepo = await getConnection.getRepository(report);
    let update = await ParentRepo.createQueryBuilder().update(ParentRepo)
        .set({answer: answer})
        .where({User_mail: email, Ishidden: false})
        .execute();
    let after_update = await ParentRepo.findOne({email: email, answer: answer});
    return after_update;
};*/
// check admin
let check_adimn = async function (email, password) {
    let admin = await getConnection.getRepository(Admin);
    let ad = await admin.findOne({email, password});
    if (ad != null) {
        return ad;
    } else {
        return null;
    }
}
let check_admins_supervisor_driver_parent_student = async function (email) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    let Ad = await admin.findOne({email: email});
    let sup = await supervisor.findOne({email: email});
    let driv = await driver.findOne({email: email});
    let par = await parent.findOne({email: email});


    if (Ad == null && sup == null && driv == null && par == null) {
        return true;
    } else {
        return false;
    }
};
//let find_student_of_paent
let find_user_by_email = async function (email, type) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    let student = await getConnection.getRepository(student);
    let Ad = await admin.findOne({email: email});
    let sup = await supervisor.findOne({email: email});
    let drive = await driver.findOne({email: email});
    let par = await parent.findOne({email: email});
    let stud = await student.findOne({email: email});
    if (Ad != null && type === "admin") {
        return Ad;
    } else if (sup != null && type === "supervisor") {
        return sup;
    } else if (stud != null && type === "student") {
        return stud;
    } else if (drive != null && type === "driver") {
        return drive;
    } else if (par != null && type === "parent") {
        return par;
    }
    /*else if(stud!=null){
        return stud;
    }*/
    else {
        return false;
    }
};

let find_user_by_address = async function (address, type) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    //let student = await getConnection.getRepository(Student);
    let Ad = await admin.findOne({address: address});
    let sup = await supervisor.findOne({address: address});
    let drive = await driver.findOne({address: address});
    let par = await parent.findOne({address: address});
    let stud = await student.findOne({address: address});
    if (Ad != null && type === "admin") {
        return Ad;
    } else if (sup != null && type === "supervisor") {
        return sup;
    } else if (drive != null && type === "driver") {
        return drive;
    } else if (par != null && type === "parent") {
        return par;
    }
    /* else if(stud!=null&&type==="supervisor"){
         return stud;
     }*/
    else {
        return false;
    }
};

let find_user_by_contact_number = async function (contact_number, type) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    //let student = await getConnection.getRepository(Student);
    let Ad = await admin.findOne({contactNumber: contact_number});
    let sup = await supervisor.findOne({contactNumber: contact_number});
    let drive = await driver.findOne({contactNumber: contact_number});
    let par = await parent.findOne({contactNumber: contact_number});
    //let stud= await student.findOne({contactNumber:contact_number});
    if (Ad != null && type === "admin") {
        return Ad;
    } else if (sup != null && type === "supervisor") {
        return sup;
    } else if (drive != null && type === "driver") {
        return drive;
    } else if (par != null && type === "parent") {
        return par;
    }
    /* else if(stud!=null){
         return stud;
     }*/
    else {
        return false;
    }
};

let find_user_by_username = async function (Username, type) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    // let student = await getConnection.getRepository(Student);
    let Ad = await admin.findOne({Username: Username});
    let sup = await supervisor.findOne({Username: Username});
    let drive = await driver.findOne({Username: Username});
    let par = await parent.findOne({Username: Username});
    // let stud= await student.findOne({Username:Username});
    if (Ad != null && type === "admin") {
        return Ad;
    } else if (sup != null && type === "supervisor") {
        return sup;
    } else if (drive != null && type === "driver") {
        return drive;
    } else if (par != null && type === "parent") {
        return par;
    }
    /*else if(stud!=null){
        return stud;
    }*/
    else {
        return false;
    }
};
let find_driver = async function (id) {
    let driv = await getConnection.getRepository(Driver);
    let dr = await driv.findOne({id: id});
    return dr;
}
let find_supervisor = async function (id) {
    let super_visor = await getConnection.getRepository(Supervisor);
    let dr = await super_visor.findOne({id: id});
    return dr;
}
let find_parent = async function (id) {
    let par = await getConnection.getRepository(Parent);
    let dr = await par.findOne({id: id});
    return dr;
}
let find_route_path = async function (route_name) {
    let par = await getConnection.getRepository(RoutePath);
    let dr = await par.findOne({name: route_name});
    if (dr == null) {
        return true;
    }
    return false;
}

let add_report = async function (repo) {
    let report_connection = await getConnection.getRepository(report);
    let add_answer = await report_connection.save(repo);
    return add_answer;
};
let get_driver_not_selected = async function () {
    let driv = await getConnection.getRepository(Driver);
    let driv_not_selected = await driv.find({where: {bus: IsNull()}});
    return driv_not_selected;
}
let get_supervisor_not_selected = async function () {
    let driv = await getConnection.getRepository(Supervisor);
    let driv_not_selected = await driv.find({where: {bus: IsNull()}});
    return driv_not_selected;
}
let get_parent = async function () {
    let parent = await getConnection.getRepository(Parent);
    let parents = await parent.find({relations: ['students', 'reports']});
    return parents;
}

let check_user_by_national_namber = async function (national) {
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    let Ad = await admin.findOne({nationalNumber: national});
    let sup = await supervisor.findOne({nationalNumber: national});
    let driv = await driver.findOne({nationalNumber: national});
    let par = await parent.findOne({nationalNumber: national});


    if (Ad == null && sup == null && driv == null && par == null) {
        return true;
    } else {
        return false;
    }
}
let check_user_by_contact_number = async function (contact) {

    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent = await getConnection.getRepository(Parent);
    let Ad = await admin.findOne({contactNumber: contact});
    let sup = await supervisor.findOne({contactNumber: contact});
    let driv = await driver.findOne({contactNumber: contact});
    let par = await parent.findOne({contactNumber: contact});


    if (Ad == null && sup == null && driv == null && par == null) {
        return true;
    } else {
        return false;
    }
}
let check_student_id = async function (id) {

    let studentRep = await connection.getRepository(student);
    let stud = await studentRep.findOne({id});
    if (stud == null) {
        return true;
    } else {
        return false;
    }
}
let check_busNumebr = async function (number) {

    let busRep = await connection.getRepository(Bus);
    let bus = await busRep.findOne({bus_numbers: number});
    if (bus == null) {
        return true;
    } else {
        return false;
    }
}
let find_bus = async function (id) {
    let bus = await getConnection.getRepository(Bus);
    let b = bus.findOne({id: id});
    return b;
}
let get_route = async function (name) {
    let path_route = await getConnection.getRepository(bus_route);
    let b = path_route.findOne({
        relations: ['bus','coordinates'],
        where: [{name: name}]
    });
    return b;
}
let get_all_routes = async function () {
    let path_route = await getConnection.getRepository(bus_route);
    let b = path_route.find({relations: ['bus','coordinates']});
    return b;
}
let find_coord = async function (id) {
    let coor = await getConnection.getRepository(points);
    let coord = await coor.findOne({id: id});
    return coord;
}

let review_reports_par = async function () {
    let ParentRepo = await getConnection.getRepository(report);
    let repo = await ParentRepo.find({relations: ['parent'], where: {type_of_user: "parent"}});
    if (repo == null) {
        return false;
    }
    return repo;
};
let review_reports_sup = async function () {
    let ParentRepo = await getConnection.getRepository(report);
    let repo = await ParentRepo.find({relations: ['supervisor'], where: {type_of_user: "supervisor"}});
    if (repo == null) {
        return false;
    }
    return repo;
};
let review_reports_admin = async function () {
    let ParentRepo = await getConnection.getRepository(report);
    let repo = await ParentRepo.find({relations: ['supervisor'], where: {type_of_user: "supervisor"}});
    if (repo == null) {
        return false;
    }
    return repo;
};
let find_and_update_report = async function (id, answer) {
    let ParentRepo = await getConnection.getRepository(report);
    await ParentRepo.createQueryBuilder().update(ParentRepo)
        .set({answer: answer})
        .where({id: id, Ishidden: false})
        .execute();
    let after_update = await ParentRepo.findOne({id: id, answer: answer});
    return after_update;
};


let get_all_students = async function () {
    let students = await getConnection.getRepository(student);
    let all_students = await students.find({relations:["parent",'bus','pickupCoordinate']});
    return all_students;
}


let get_notifications=async function(){
    let not=await getConnection.getRepository(report);
    let notifications=not.find({User_mail:"Admin"});
    return notifications;
}
module.exports = {
    event, review_reports_par,
    get_notifications,
    review_reports_sup,
    check_student_id,
    get_all_students,
    find_coord,
    check_busNumebr,
    check_user_by_contact_number,
    check_user_by_national_namber,
    //save,
    add_admin,
    add_route,
    find_supervisor,
    add_student,
    add_parent,
    add_superavisor,
    add_driver,
    add_buses,
    get_buses,
    get_admins,
    review_reports,
    check_admins_supervisor_driver_parent_student,
    find_driver,
    getsupervisor,
    check_adimn,
    find_user_by_username,
    find_user_by_contact_number,
    find_user_by_address,
    find_user_by_email,
    add_report,
    find_and_update_report,
    get_supervisor_not_selected,
    get_driver_not_selected,
    find_route_path,
    getdrivers,
    get_parent,
    find_bus,
    find_parent,
    add_coord,
    get_route,
    get_buses_with_coordinates,
    get_buses_without_routes
,
    get_all_routes
    /*  findByCandidateAndExamAndPosition,
      findByCandidateAndPosition,
      getUserExam,updateSolvingUserExam, updateUserExamResults,getUserEx*/

};