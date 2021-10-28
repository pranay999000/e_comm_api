const mongoose = require("mongoose");

const app = require("./app");
const pass = require("./config/config")

const port = 4000;

mongoose
    .connect(
        pass
    )
    .then(() => {
        console.log("Database connected!!");
    });

app.listen(port, () => {
    console.log(`App running on the ${port}....`);
});
