const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
// Sets up the Express App
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: 'https://img-direct-shop.herokuapp.com'
}
// corsOptions
app.use(cors(corsOptions));
// Static directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
/////////////////////////////////
const userRoutes = require("./routes/user-routes.js")
const imageRoutes = require("./routes/image-routes.js")

// Routes
// =============================================================
app.use(userRoutes)
app.use(imageRoutes)

// Syncing our sequelize models and then starting our Express app
// =============================================================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});

// Export For Tests
module.exports = app