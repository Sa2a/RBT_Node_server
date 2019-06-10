const Admin = require('../entity/Admin').Admin;
const Driver = require('../entity/Driver').Driver;
const bus = require('../entity/Bus').Bus;
const student = require('../entity/Student').Student;
const Supervisor =require('../entity/Supervisor').Supervisor;
const report = require('../entity/Report').Report;
const Parent = require('../entity/Parent').Parent;
const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");

let event = new eventEmitter();

// to add a new admin
let add_admin=async function(admin)
{
    let adminRep = await connection.getRepository(Admin);
    await adminRep.save(admin);
    let adm=await adminRep.findOne(admin);
    return adm;
}

// add a new student
let add_student=async function(stud)
{
    let studentRep = await connection.getRepository(student);
    await studentRep.save(stud);
    let s=await studentRep.find(stud);
    return s;
}
//add a new parent
let add_parent=async function(par)
{
    let studentRep = await connection.getRepository(Parent);
    await studentRep.save(par);
    let adm=await studentRep.find(par);
    return adm;
}

//add a new supervisor
let add_superavisor=async function(sup)
{
    let studentRep = await connection.getRepository(Supervisor);
    await studentRep.save(sup);
    let adm=await studentRep.find(sup);
    return adm;
}

//add a new driver
let add_driver=async function(drive)
{
    let driver = await connection.getRepository(Driver);
    await driver.save(drive);
    let adm=await driver.find(drive);
    return adm;
}
//add bus
let add_buses=async function(bus){
    let busRep=await connection.getRepository(bus);
    await busRep.save(bus);
}
//get all admins
let get_admins = async function ()
{
    let admin = await getConnection.getRepository(Admin);
    let Ad = await admin.find();
    return Ad;
};
let check_user_by_contact_number=async function(contact){
    let adm=await getConnection.getRepository(Admin);
    let sup=await getConnection.getRepository(Supervisor);
    let driv=await getConnection.getRepository(Driver);
    let par= await getConnection.getRepository(Parent);
    let admin=adm.find({contactNumber:contact});
    let supervis=sup.find({contactNumber:contact});
    let parent=par.find({contactNumber:contact});
    let driver= driv.find({contactNumber:contact});
    if(admin!=null||supervis!=null||parent!=null||driver!=null){
        return false;
    }
    else
    {
        return true;
    }
}



let check_user_by_national_namber=async function(national){
    let adm=await getConnection.getRepository(Admin);
    let sup=await getConnection.getRepository(Supervisor);
    let driv=await getConnection.getRepository(Driver);
    let par= await getConnection.getRepository(Parent);
    let admin=adm.find({nationalNumber:national});
    let supervis=sup.find({nationalNumber:national});
    let parent=par.find({nationalNumber:national});
    let driver= driv.find({nationalNumber:national});
    if(admin!=null||supervis!=null||parent!=null||driver!=null){
        return false;
    }
    else
    {
        return true;
    }
}
//get all parents
let getparents=async function(){
    let ParentRepo=await getConnection.getRepository(Parent);
    let Parents=await ParentRepo.find({relation:['driver','supervisor','students','routePath']});
    return Parents;}

////get all drivers
let getdrivers=async function(){
    let DriverRepo=await getConnection.getRepository(Driver);
    let drivers=await DriverRepo.find();
    return drivers;}

////get all supervisor
let getsupervisor=async function(){
    let supervisorRepo=await getConnection.getRepository(Supervisor);
    let supervis=await supervisorRepo.find();
    return supervis;}
//review reports
let review_reports=async function(){
    let ParentRepo=await getConnection.getRepository(report);
    let repo=await ParentRepo.find();
    return repo;
};
//find report to answer
let find_and_update_report=async function(email,answer){
    let ParentRepo=await getConnection.getRepository(report);
    let update=await  ParentRepo.createQueryBuilder().update(ParentRepo)
        .set({ answer: answer})
        .where( {User_mail:email,Ishidden:false})
        .execute();
    let after_update=await ParentRepo.findOne({email:email,answer:answer});
    return after_update;
};
// check admin
let check_adimn=async function (email,password){
    let admin = await getConnection.getRepository(Admin);
    let ad=await admin.findOne({email,password});
    if(ad!=null){
        return ad;
    }
    else {
        return null;
    }
}
let check_admins_supervisor_driver_parent_student = async function (email)
{
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent= await getConnection.getRepository(Parent);
    let Ad= await admin.findOne({email:email});
    let sup = await supervisor.findOne({email:email});
    let driv = await driver.findOne({email:email});
    let par= await parent.findOne({email:email});


    if(Ad==null&&sup==null&&driv==null&&par==null){
        return true;
    }
    else{
        return false;
    }
};
//let find_student_of_paent
let find_user_by_email= async function(email,type){
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent= await getConnection.getRepository(Parent);
    let student = await getConnection.getRepository(Student);
    let Ad= await admin.findOne({email:email});
    let sup = await supervisor.findOne({email:email});
    let drive = await driver.findOne({email:email});
    let par= await parent.findOne({email:email});
    let stud= await student.findOne({email:email});
    if(Ad!=null&&type==="admin"){
        return Ad;
    }
    else if(sup!=null&&type==="supervisor"){
        return sup;
    }
    else if(stud!=null&&type==="student"){
        return stud;
    }
    else if(drive!=null&&type==="driver"){
        return drive;
    }
    else if(par!=null&&type=="parent"){
        return par;
    }
    /*else if(stud!=null){
        return stud;
    }*/
    else {
        return false;
    }
};

let find_user_by_address= async function(address,type){
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent= await getConnection.getRepository(Parent);
    //let student = await getConnection.getRepository(Student);
    let Ad= await admin.findOne({address:address});
    let sup = await supervisor.findOne({address:address});
    let drive = await driver.findOne({address:address});
    let par= await parent.findOne({address:address});
    let stud= await student.findOne({address:address});
    if(Ad!=null&&type==="admin"){
        return Ad;
    }
    else if(sup!=null&&type==="supervisor"){
        return sup;
    }
    else if(drive!=null&&type==="driver"){
        return drive;
    }
    else if(par!=null&&type==="parent"){
        return par;
    }
    /* else if(stud!=null&&type==="supervisor"){
         return stud;
     }*/
    else {
        return false;
    }
};

let find_user_by_contact_number= async function(contact_number,type){
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent= await getConnection.getRepository(Parent);
    //let student = await getConnection.getRepository(Student);
    let Ad= await admin.findOne({contactNumber:contact_number});
    let sup = await supervisor.findOne({contactNumber:contact_number});
    let drive = await driver.findOne({contactNumber:contact_number});
    let par= await parent.findOne({contactNumber:contact_number});
    //let stud= await student.findOne({contactNumber:contact_number});
    if(Ad!=null&&type==="admin"){
        return Ad;
    }
    else if(sup!=null&&type==="supervisor"){
        return sup;
    }
    else if(drive!=null&&type==="driver"){
        return drive;
    }
    else if(par!=null&&type==="parent"){
        return par;
    }
    /* else if(stud!=null){
         return stud;
     }*/
    else {
        return false;
    }
};

let find_user_by_username= async function(Username,type){
    let admin = await getConnection.getRepository(Admin);
    let supervisor = await getConnection.getRepository(Supervisor);
    let driver = await getConnection.getRepository(Driver);
    let parent= await getConnection.getRepository(Parent);
    // let student = await getConnection.getRepository(Student);
    let Ad= await admin.findOne({Username:Username});
    let sup = await supervisor.findOne({Username:Username});
    let drive = await driver.findOne({Username:Username});
    let par= await parent.findOne({Username:Username});
    // let stud= await student.findOne({Username:Username});
    if(Ad!=null&&type==="admin"){
        return Ad;
    }
    else if(sup!=null&&type==="supervisor"){
        return sup;
    }
    else if(drive!=null&&type==="driver"){
        return drive;
    }
    else if(par!=null&&type==="parent"){
        return par;
    }
    /*else if(stud!=null){
        return stud;
    }*/
    else {
        return false;
    }
};
let find_driver=async function(id){
    let driv=await getConnection.getRepository(Driver);
    let dr=await driv.findOne({id:id});
    return dr;
}
let find_supervisor=async function(id){
    let super_visor=await getConnection.getRepository(Supervisor);
    let dr=await super_visor.findOne({id:id});
    return dr;
}

let add_report=async function(repo){
    let report_connection=await getConnection.getRepository(report);
    let add_answer=await report_connection.save(repo);
    return add_answer;
};
let get_driver_not_selected=async function(){
    let driv=await getConnection.getRepository(Driver);
    let driv_not_selected=driv.find({bus:null});
    return driv_not_selected;
}
let get_supervisor_not_selected=async function(){
    let driv=await getConnection.getRepository(Supervisor);
    let driv_not_selected=driv.find({bus:null});
    return driv_not_selected;
}

/*
///////
let findByCandidateAndPosition = async function (candidate,position)
{
    let userExamRepo = await getConnection.getRepository(UserExams);
    let Exams = await userExamRepo.find(
        {
            where: {candidate: candidate,position: position},
            relations : ["exam","candidate","precedence","questions","position"]
        });
    return Exams;
};
let findByCandidateAndExamAndPosition =async function (candidate,exam,position)
{
    let userExamRepo = await getConnection.getRepository(UserExams);
    let Exams = await userExamRepo.findOne(
        {
            where: {exam: exam, candidate: candidate,position: position},
            relations : ["exam","candidate","precedence","questions"]
        });
    return Exams;
};
//Emitter.on("save",(userExam) =>{
let save = async function (userExam){
    let userExamRepo = await getConnection.getRepository(UserExams);
    await userExamRepo.save(userExam);
};
//////////////////////////////////////////////////////////////////////////////////////////
event.on('getUserGeneratedExam', async (req, res) => {
    //user exam should come from sessions
    // let exam = req.session.exam;
    // let candidate = req.session.candidate;
    // let exam = await connection.getRepository(Exam).findOne({name: req.body.examName}, {relations: ["questions"]});
    // let candidate = await connection.getRepository(Candidate).findOne({username: req.body.userName});
    let userExam = await getUserEx(req);
    let exam = userExam.exam;
    let status = false;
    let numOfQuestions =4;
    if (userExam.precedence == null || userExam.precedence.passed) {
        if (userExam.questions.length != numOfQuestions) {
            let generatedQuestions = getRandomElements(exam.questions, numOfQuestions);
            for (let i = 0; i < numOfQuestions; i++) {
                let questionDetails = new QuestionDetail();
                questionDetails.question = generatedQuestions[i];
                let wrongAns = await connection.manager.find(Answer, {
                    question: questionDetails.question,
                    correctness: false
                });
                questionDetails.answers = getRandomElements(wrongAns, 3);
                let correctAnswers = await connection.manager.find(Answer, {
                    question: questionDetails.question,
                    correctness: true
                });
                questionDetails.answers.push(getRandomElements(correctAnswers, 1)[0]);
                shuffle(questionDetails.answers);
                questionDetails.userExam = userExam;
                await connection.manager.save(questionDetails);
                // userExam.questions.push(questionDetails);
            }
            userExam = await getUserEx(req);
        }
        // await userExam.reload();
        status = true;
    }
    // req.session.setTimeout(10,(gfhgj)=>{
    //    console.log('timeOut')
    // });
    res.send({status: status, userExam: userExam});
});
// let getUserExam = ( examName, userName)=>{
//     return typeorm.createConnection().then(async connection => {
//         let exam = await connection.getRepository(Exam).findOne({name: examName},{ relations: ["questions"] });
//         let candidate = await connection.getRepository(Candidate).findOne({username: userName});
//         let userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
//             {relations:["exam","candidate","questions","questions.question","questions.chosenAnswer","questions.answers"]});
//         await connection.close();
//         return userExam;
//     }).catch(error => console.log(error));
// };
function getRandomElements(arr, numOfElements) {
    let returnArray = new Array(numOfElements);
    let chosenIndex;
    let chosenElements = new Array(numOfElements);
    for (let i=0; i< numOfElements; i++) {
        do {
            chosenIndex = randomInt(0, arr.length);
        } while (chosenElements.includes(chosenIndex));
        chosenElements[i] = chosenIndex;
        returnArray[i] = arr[chosenIndex];
    }
    return returnArray;
}
function randomInt(low, high) {// low (inclusive) and high (exclusive) ([low, high
    return Math.floor(Math.random() * (high - low) + low)
}
let getUserExam = async (examName, userName) => {
    let exam = await connection.getRepository(Exam).findOne({name: examName}, {relations: ["questions"]});
    let candidate = await connection.getRepository(Candidate).findOne({username: userName});
    return await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
        {relations: ["exam", "candidate", "precedence", "precedence.exam", "precedence.candidate",
                "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});
};
let getUserEx = async (req) => {
    return await connection.manager.findOne(UserExams, {id: req.session.userExamID},
        {relations: ["exam","exam.questions", "candidate","precedence","precedence.exam","precedence.candidate", "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});
};
let updateSolvingUserExam = async (req)=> {
    //user exam should come from sessions
    let userExam = await getUserEx(req);
    let questionDetail = req.body.questionDetail;
    let chosenAnsID = req.body.chosenAnswerID;
    await connection.getRepository(QuestionDetail).update({userExam: userExam, question: questionDetail.question},
        {chosenAnswer: chosenAnsID});
};
let updateUserExamResults = async (req) => {
    let userExam =await getUserEx(req);
    let score = 0 ;
    let numOfQuestions= userExam.questions.length;
    userExam.questions.forEach((questionDetail)=>{
        if (questionDetail.chosenAnswer && questionDetail.chosenAnswer.correctness)
        {
            score+= 1/numOfQuestions;
        }
    });
    let passed = false;
    if(score>= .5){
        passed = true;
    }
    await connection.getRepository(UserExams).update({id:userExam.id},{passed:passed, score:score});
};
*/

module.exports ={
    event,
    check_user_by_contact_number,
    check_user_by_national_namber,
    //save,
    add_admin,
    find_supervisor,
    add_student,
    add_parent,
    add_superavisor,
    add_driver,
    add_buses,
    getparents,
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
    getdrivers

    /*  findByCandidateAndExamAndPosition,
      findByCandidateAndPosition,
      getUserExam,updateSolvingUserExam, updateUserExamResults,getUserEx*/

};