const Admin = require( "../entity/Admin").Admin;

const app = require("../app").app;
const getConnection = require("typeorm").getConnection();
const connection = getConnection;

let i =1;
app.post('/reactTest',(req,res)=>{
    console.log("came here "+i++);
    res.send({data:"hellow from node "+req.body.name});
    res.render(path.join(__dirname,'..' + '/','public','register.html'));

});

app.get('/reactTestGet', async (req, res) => {
    /*let adminRep = await connection.getRepository(Admin);
    let admin = new Admin();
    admin.name = "sa2a";
    admin.password = "123";
    await adminRep.save(admin);
    res.send(admin);*/

    res.sendfile( 'register');

});

