const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
// Sets up the Express App
var PORT = process.env.PORT || 3001;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var corsOptions = {
//   origin: 'https://bjh-hop-estore.herokuapp.com'
// }
// corsOptions
app.use(cors());
// Static directory
app.use(express.static("public"));
/////////////////////////////////
const userRoutes = require("./routes/user-routes.js")
const imageRoutes = require("./routes/image-routes.js")


// Routes
// =============================================================
app.use(userRoutes)
app.use(imageRoutes)





// Syncing our sequelize models and then starting our Express app
// =============================================================


// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});

module.exports = app