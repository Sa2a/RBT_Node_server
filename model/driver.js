const drivers=[];
const db = require('mysql2');

module.exports= class driver{

    constructor(id,username,password,bus_id,national_number,picture,age,address) {
        this.username= username;
        this.password=password;
        this.id=id;
        this.bus_ID=bus_id;
        this.national_number=national_number;
        this.picture=picture;
        this.age=age;
        this.address=address;

    }
    save(){
            const insert= db.createConnection({

                host     : "localhost",
                user     : "root",
                password :"",
                database: "RBT"
            });
            insert.execute('INSERT INTO driver (id,username,password,age,address,natoinal_number,bus_id,picture) VALUES (?,?,?,?,?,?,?,?)',[this.id,this.username,this.password,this.age,this.address,this.national_number,this.bus_ID,this.picture]);
        }
    }


}


