const admins=[];
const admins_existed=[];
const db = require('mysql2');

module.exports= class admin{

    constructor(id,username,password) {
        this.username= username;
        this.password=password;
        this.id=id;

    }
         save(){
  const insert= db.createConnection({

          host     : "localhost",
          user     : "root",
          password :"",
          database: "RBT"
  });
  insert.execute('INSERT INTO admin (id,username,password) VALUES (?,?,?)',[this.id,this.username,this.password]);
    }

    check_existed_or_not(){
        connection.connect(function(err) {
            if(err) throw err;
            else {
                connection.query("SELECT * FROM admin",(err, result) => {
                    if(err) {
                        console.log(err);
                        res.json({"error":true});
                    }
                    else {
                        console.log(result);

                    }
                });
            }
        });
        for(let i =0;i<admins_existed.length();i++) {
            if(this.id.localeCompare(admins_existed[i].id)&&this.password.localeCompare(admins_existed[i].password)&&this.username.localeCompare(admins_existed[i].username)){
               return true;
            }
        }
        return false;

    }
}


