const Admin_cont = require("../databaserequests/Admin_controller");
const ad_ = require("../entity/Admin").Admin;
const student = require("../entity/Student").Student;
const parent = require("../entity/Parent").Parent;
const super_vis = require("../entity/Supervisor").Supervisor;
const driv = require("../entity/Driver").Driver;
const bus = require("../entity/Bus").Bus;
const coordinates = require("../entity/Coordinates").Coordinates;
const report = require("../entity/Report").Report;
const bus_route = require("../entity/RoutePath").RoutePath;
const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const session = require('express-session');

app.get('/review_notification_of_admin', async (req, res) => {

    Admin_cont.get_notifications().then(result => {
        res.send({reports:result});
    });
});
app.get('/get_All_routes', async (req, res) => {

    Admin_cont.get_all_routes().then((result) => {
        res.send({routes: result});
    });
})
app.get('/review_reports_parents', async (req, res) => {

    Admin_cont.review_reports_par().then((result) => {
        if (result === false) {
            res.send({reports: false})
        } else {
            res.send({reports: result});
        }
    });
});
app.get('/review_reports_supervisors', async (req, res) => {

    Admin_cont.review_reports_sup().then((result) => {
        if (result == false) {
            res.send({reports: false})
        } else {
            res.send({reports: result});
        }
    });
});
app.get('/review_reports_admins', async (req, res) => {

    Admin_cont.review_reports_admin().then((result) => {
        if (result == false) {
            res.send({reports: false})
        } else {
            res.send({reports: result});
        }
    });
});
app.post('/notification', async (req, res) => {
    let repo = new report();
    repo.content = req.body.notification.content;
    repo.User_mail = "Admin";
    repo.receiver_mail_or_id = req.body.notification.user_type;
    Admin_cont.add_report(repo).then(result => {
        res.send({report: result});
    })

});
app.post('/add_answer', async (req, res) => {
    Admin_cont.find_and_update_report(req.body.answer.reportId, req.body.answer.answer).then(result => {
        res.send({answer: result})
    })
});
app.get('/get_find_students', async (req, res) => {
    Admin_cont.get_all_students().then((result) => {
        console.log(result);
        res.send({Users: result});
    })
})

app.post('/add_bus', async (req, res) => {
    let check_busNumebr = await Admin_cont.check_busNumebr(req.body.bus.busNumber);
    if (check_busNumebr === false) {
        res.send({status: "bus Number/Name is already exist"});
        return;
    }
    let b = new bus();
    b.bus_numbers = req.body.bus.busNumber;
    b.capacity = req.body.bus.capacity;
    b.driver = await Admin_cont.find_driver(req.body.bus.driverID);
    b.supervisor = await Admin_cont.find_supervisor(req.body.bus.supervisorID);

    Admin_cont.add_buses(b).then(result => {
        res.send({bus: result, status: true});
    })
})

app.get('/find_supervisor_not_selected', async (req, res) => {
    Admin_cont.get_supervisor_not_selected().then((result) => {
        res.send({supervisor: result});
    })
})
app.get('/find_driver_not_selected', async (req, res) => {
    Admin_cont.get_driver_not_selected().then((result) => {
        res.send({driver: result});
    })
})

app.get('/get_buses_with_coordinates', async (req, res) => {
    Admin_cont.get_buses_with_coordinates().then((result) => {
        res.send({buses: result});
    })
})
app.get('/get_buses', async (req, res) => {
    Admin_cont.get_buses().then((result) => {
        res.send({buses: result});
    })
})
app.get('/get_buses_without_routes', async (req, res) => {
    Admin_cont.get_buses_without_routes().then((result) => {
        res.send({buses: result});
    })
})
app.post('/add_user', async (req, res) => {


    let check_email = await Admin_cont.check_admins_supervisor_driver_parent_student(req.body.user.email);
    if (check_email === false) {
        res.send({status: "Email is already exist"});
        return;
    }
    let check_by_contact = await Admin_cont.check_user_by_contact_number(req.body.user.contactNumber);
    if (check_by_contact === false) {
        res.send({status: "The Contact Number is already exist"});
        return;
    }


    let check_by_national = await Admin_cont.check_user_by_national_namber(req.body.user.nationalNumber);
    if (check_by_national === false) {
        res.send({status: "The National Number is already exist"});
        return;
    }

    if (req.body.user.userType === "admin") {
        let addmin = new ad_();
        addmin.id = req.body.user.id;
        addmin.firstName = req.body.user.firstName;
        addmin.lastName = req.body.user.lastName;
        addmin.username = addmin.firstName + "_" + addmin.lastName;
        addmin.password = req.body.user.password;
        addmin.contactNumber = req.body.user.contactNumber;
        addmin.dateOfBirth = req.body.user.dateOfBirth;
        addmin.email = req.body.user.email;
        addmin.nationalNumber = req.body.user.nationalNumber;
        addmin.address = req.body.user.address;
        Admin_cont.add_admin(addmin).then(result => {
            res.send({user: result, status: true});
        })
    } else if (req.body.user.userType === "supervisor") {
        let supervisor = new super_vis();
        supervisor.id = req.body.user.id;
        supervisor.firstName = req.body.user.firstName;
        supervisor.lastName = req.body.user.lastName;
        supervisor.username = supervisor.firstName + "_" + supervisor.lastName;
        supervisor.password = req.body.user.password;
        supervisor.contactNumber = req.body.user.contactNumber;
        supervisor.dateOfBirth = req.body.user.dateOfBirth;
        supervisor.email = req.body.user.email;
        supervisor.nationalNumber = req.body.user.nationalNumber;
        supervisor.address = req.body.user.address;
        supervisor.Type_of_user = req.body.user.userType;
        Admin_cont.add_superavisor(supervisor).then(result => {
            res.send({user: result, status: true});
        })
    } else if (req.body.user.userType === "driver") {
        let driver = new driv();
        driver.id = req.body.user.id;
        driver.firstName = req.body.user.firstName;
        driver.lastName = req.body.user.lastName;
        driver.username = driver.firstName + "_" + driver.lastName;
        driver.password = req.body.user.password;
        driver.contactNumber = req.body.user.contactNumber;
        driver.dateOfBirth = req.body.user.dateOfBirth;
        driver.email = req.body.user.email;
        driver.address = req.body.user.address;
        driver.nationalNumber = req.body.user.nationalNumber;
        driver.Type_of_user = req.body.user.userType;

        Admin_cont.add_driver(driver).then(result => {
            res.send({user: result, status: true});
        })
    } else {
        let par = new parent();
        let students = [];
        par.firstName = req.body.user.firstName;
        par.lastName = req.body.user.lastName;
        par.username = par.firstName + "_" + par.lastName;
        par.password = req.body.user.password;
        par.contactNumber = req.body.user.contactNumber;
        par.dateOfBirth = req.body.user.dateOfBirth;
        par.email = req.body.user.email;
        par.nationalNumber = req.body.user.nationalNumber;
        par.address = req.body.user.address;
        par.Type_of_user = req.body.user.userType;
        let add_par = await Admin_cont.add_parent(par);

        let status = true;
        let state = "student exitss with the same ides = ";
        for (let i = 0; i < req.body.user.students.length; i++) {
            let check_id = await Admin_cont.check_student_id(req.body.user.students[i].id);
            if (check_id === false) {
                status = false;
                state += req.body.user.students[i].id + ', ';
                continue;
            }
            let stud = new student();
            stud.id = req.body.user.students[i].id;
            stud.name = req.body.user.students[i].name;
            stud.classNumber = req.body.user.students[i].classNumber;
            stud.level = req.body.user.students[i].level;
            stud.dateOfBirth = req.body.user.students[i].dateOfBirth;
            stud.address = req.body.user.students[i].address;
            stud.parent = add_par;
            stud.bus = await Admin_cont.find_bus(req.body.user.students[i].busId);
            stud.pickupCoordinate = await Admin_cont.find_coord(req.body.user.students[i].pickUpPointId);
            await Admin_cont.add_student(stud);
            students.push(stud);
        }
        res.send({user: add_par, status: status ? true : state});

    }
})
//add student
app.post('/add_student', async (req, res) => {
    if (req.body.student.parentId == null) {
        res.send({status: 'parent field is required'});
        return;
    }
    let check_id = await Admin_cont.check_student_id(req.body.student.id);
    if (check_id === false) {
        res.send({status: "A student with the same id exists"});
        return;
    }
    let stud = new student();
    stud.name = req.body.student.name;
    stud.id = req.body.student.id;
    stud.dateOfBirth = req.body.student.dateOfBirth;
    stud.address = req.body.student.address;
    stud.classNumber = req.body.student.classNumber;
    stud.level = req.body.student.level;
    stud.parent = await Admin_cont.find_parent(req.body.student.parentId);
    stud.bus = await Admin_cont.find_bus(req.body.student.busId);
    stud.pickupCoordinate = await Admin_cont.find_coord(req.body.student.pickUpPointId)
    Admin_cont.add_student(stud).then(result => {
        res.send({status: true, student: result});
    });
});
app.post('/add_route', async (req, res) => {
    let route = new bus_route();
    route.name = req.body.route.name;
    let check = await Admin_cont.find_route_path(route.name);
    if (check === false) {
        res.send({status: "A route withe the same name already exists"});
        return;
    }
    route.bus = await Admin_cont.find_bus(req.body.route.busId);
    let points = [];
    for (let i = 0; i < req.body.route.pickUpPoints.length; i++) {
        let pickup = new coordinates();
        pickup.address = req.body.route.pickUpPoints[i].address;
        pickup.label = req.body.route.pickUpPoints[i].label;
        pickup.latitude = req.body.route.pickUpPoints[i].lat;
        pickup.longitude = req.body.route.pickUpPoints[i].lng;
        await Admin_cont.add_coord(pickup);
        points.push(pickup);
    }
    route.coordinates = points;
    await Admin_cont.add_route(route);
    res.send({status: true, route: route});

})
/*
app.post('/add_pick_up_points',async(req,res)=>{
    let pickup=new coordinates();
    pickup.address=req.body.address;
    pickup.label=req.body.label;
    pickup.latitude=req.body.lat;
    pickup.longitude=req.body.lng;
   let coord=await Admin_cont.add_coord(pickup);
   res.send({result:coord});
})*/
app.post('/get_route', async (req, res) => {
    Admin_cont.get_route(req.body.name).then((result) => {
        res.send({Routes: result});
    })
})
app.get('/get_find_admins', async (req, res) => {
    Admin_cont.get_admins().then((result) => {
        console.log(result);
        res.send({Users: result});
    });
});
app.get('/get_find_parents', async (req, res) => {
    Admin_cont.get_parent().then((result) => {
        console.log(result);
        res.send({Users: result});
    })
})
app.get('/get_find_drivers', async (req, res) => {
    Admin_cont.getdrivers().then((result) => {
        console.log(result);
        res.send({Users: result});
    })
});
app.get('/get_find_supervisors', async (req, res) => {
    Admin_cont.getsupervisor().then((result) => {
        console.log(result);
        res.send({Users: result});
    })
});
app.get('/review_reports', async (req, res) => {

    Admin_cont.review_reports().then((result) => {
        console.log(result);
        res.send(result);
    });
});
app.get('/add_resp', async (req, res) => {
    let repo = new report();
    repo.content = req.body.content;
    repo.receiver_mail_or_id = req.body.email;
    repo.User_mail = "admin";
    Admin_cont.add_report(repo).then(result => {
        res.send(result);
    })
});
app.post('/login', async (req, res) => {
    Admin_cont.check_adimn(req.body.email, req.body.password).then(
        (result => {
            if (result != null) {
                req.session.user = result;
                res.send({user: result});
            } else {
                res.send({user: null});
            }
        })
    )
});

app.post('/find_user', async (req, res) => {
    if (req.body.type === "email") {
        Admin_cont.find_user_by_email(req.body.email, req.body.usertype).then(result => {
            if (result != null) {
                res.send({user: result});
            } else {
                res.send({user: null});
            }
        })
    } else if (req.body.type === "address") {
        Admin_cont.find_user_by_address(req.body.address, req.body.usertype).then(result => {
            if (result != null) {
                res.send({user: result});
            } else {
                res.send({user: null});
            }
        })
    } else if (req.body.type === "contact_number") {
        Admin_cont.find_user_by_contact_number(req.body.address, req.body.usertype).then(result => {
            if (result != null) {
                res.send({user: result});
            } else {
                res.send({user: null});
            }

        })
    } else if (req.body.type === "username") {
        Admin_cont.find_user_by_username(req.body.username, req.body.usertype).then(result => {
            if (result != null) {
                res.send({user: result});
            } else {
                res.send({user: null});
            }
        })
    }
})

app.post('/add_answer', async (req, res) => {
    Admin_cont.find_and_update_report("req.body.email", "req.body.answer").then(result => {
        res.send(result)
    })
});
