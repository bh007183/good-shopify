
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//CREATE ACCOUNT ROUTE//

router.post("/api/createAccount", async (req, res) => {
  const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
  const data = await db.User.create({
    email: req.body.email,
    password: hashedPass,
  }).catch((err) => res.status(404).json(err));
  res.json(data);
});


//LOGIN ROUTE//

router.post("/login", async (req, res) => {
  const data = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).catch((err) => res.json(err).end());
  if (!data || data === null) {
    res.json("No such user!").end();
  } else {
    const validate = await bcrypt
      .compare(req.body.password, data.password)
      .catch((err) => res.json(err));
    if (validate) {
      jwt.sign(
        {
          email: data.email,
          id: data.id,
        },
        process.env.JWS_TOKEN,
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) {
            res.json("Error connecting token");
          }
          res.json({ token, user: data.email.substring(0, data.email.indexOf("@")), id: data.id });
        }
      );
    } else {
      res.status(401).send("No such user!");
    }
  }
});

module.exports = router;
