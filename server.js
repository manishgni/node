const express = require("express");

const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();


app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
app.use(
    cookieSession({
        name: "bezkoder-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// routes

// set port, listen for requests