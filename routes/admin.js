var express = require('express');
var router = express.Router();
let admin = require('../model/admin');
let supervisor = require('../model/supervisor');
let driver = require('../model/driver');
const mysql      = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('first_page');

});

//login
router.get('/login',function(req,res,next){
    res.render('login');
})
router.post('/login',function (req,res,next){
let check_admin =new admin(req.body.id,req.body.username,req.body.password);
if(check_admin.check_existed_or_not()==false){
    res.redirect('/login');
}
res.render('admin_page');


 //req.body.
})


//add admin
router.get('/addadmin',function (req,res,next) {
    res.render('add_admin');
})
router.post('/addadmin',function (req,res,next) {
    const id=req.body.id;
    const username=req.body.username;
    const password=req.body.password;
    let new_adm=new admin(id,username,password);
    new_adm.save().then(() => {
        res.redirect('/admin page');
    }).catch(err=> console.log(err));
    res.redirect('/addadmin');
})
// add supervisor
router.get('/addsupervisor',function (req,res,next) {
    res.render('addsupervisor');
})
router.post('/addsupervisor',function (req,res,next) {
    const id=req.body.id;
    const username=req.body.username;
    const password=req.body.password;
    const bus_id=req.body.bus_ID;
    const date_of_birth=req.body.date_of_birth;
    let new_super=new supervisor(id,username,password,bus_id,date_of_birth);
    new_super.save().then(() => {
        res.redirect('/admin page');
    }).catch(err=> console.log(err));
    res.redirect('/addsupervisor');
})


// add driver

router.get('/adddriver',function (req,res,next) {
    res.render('adddriver');
})
router.post('/adddriver',function (req,res,next) {
    const id=req.body.id;
    const username=req.body.username;
    const password=req.body.password;
    const bus_id=req.body.bus_ID;
    const pictures=req.body.picture;
    const national_number=req.national_number;
    let driv=new driver(id,username,password,bus_id,notional_number,pictures,);
    new_super.save().then(() => {
        res.redirect('/admin page');
    }).catch(err=> console.log(err));
    res.redirect('/adddriver');
})

// add parent& student

//logout
router.get('/logout',function (req,res,next){
    res.redirect('/routes/login');
})
module.exports = router;