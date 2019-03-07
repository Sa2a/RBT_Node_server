const supervisor=[];
const db = require('mysql2');

module.exports= class supervisor{

    constructor(id,username,password,bus_id,date_of_birth) {
        this.username= username;
        this.password=password;
        this.id=id;
        this.bus_ID=bus_id;
        this.date_of_birth=date_of_birth;

    }
    save(){
        const insert= db.createConnection({

            host     : "localhost",
            user     : "root",
            password :"",
            database: "RBT"
        });
        insert.execute('INSERT INTO supervisor (id,username,password,bus_id,date_of_birth) VALUES (?,?,?,?,?)',[this.id,this.username,this.password,this.bus_ID,this.date_of_birth]);
    }
}
    }


}


