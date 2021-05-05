
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
  try{const data = await db.User.create({
    email: req.body.email,
    password: hashedPass,
  })
  res.status(200).json("Account Created!")
}catch(err){
  res.status(400).send(err);
  
} 
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

//Delete User and associated Images Route//
router.delete("/api/delete/user/:id", async (req, res) => {

  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(403).send("Please Login");
  } else {
    let tokenMatch = jwt.verify(token, process.env.JWS_TOKEN, (err, verify) => {
      if (err) {
        return false;
      } else {
        return verify;
      }
    });
    if (tokenMatch) {
     
      const data = await db.User.destroy( {
        where: {
          id: req.params.id,

        },
      }).catch((err) => res.status(404).json(err));
      console.log(data)
      res.json(data);
    } else {
      res
        .status(403)
        .json(
          "Authorization Error! You either do not have access or session has expired."
        );
    }
  }
});

module.exports = router;
