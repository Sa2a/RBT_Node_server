const Admin_cont = require("../databaserequests/Admin_controller");
let {db, io} = require("./../app");


io.on("connection", async socket => {
    console.log("New client connected");

    let buses = await Admin_cont.get_buses_with_coordinates();
    buses.forEach(bus => {
        let ref = db.ref("userInformation").orderByChild("uemail").equalTo(bus.driver.email);
        let userID;
        ref.once("value", function (data) {
            if (data.val()) {
                console.log(Object.keys(data.val())[0]);
                userID = Object.keys(data.val())[0];
                let pointTrack = db.ref("publicLocation/" + userID);

                // Attach an asynchronous callback to read the data at our posts reference
                pointTrack.on("value", function (point) {
                    try {
                        socket.emit(bus.routePath.name, point); // Emitting a new message. It will be consumed by the client
                    } catch (error) {
                        console.error(`Error: ${error.code}`);
                    }
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
            else
                console.log('user id not found error');
        });

    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});
