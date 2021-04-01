const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

// set port, listen for requests
const PORT = process.env.PORT || 8080;

const app = express();
app.use(morgan("tiny"));
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions)); // cors provides Express middleware to enable CORS

// parse requests of content-type - application/json // body-parser helps to parse the request and create the req.body object
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const Role = db.role;

require("./app/routes/auth.routes")(app); // Auth Route
require("./app/routes/user.routes")(app); // User Route

// Db connection
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Testing " });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Db data setup : initial() function helps us to create 3 important rows in roles collection.
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
