const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

//////POST A PHOTO////////

router.post("/api/singlepost", async (req, res) => {
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
      const data = await db.Image.create({
        url: req.body.url,
        title: req.body.title,
        category: req.body.category,
        public: req.body.public,
        UserId: tokenMatch.id,
      }).catch((err) => res.status(404).json(err));
      res.status(200).json(data);
    } else {
      res
        .status(403)
        .json(
          "Authorization Error! You either do not have access or session has expired."
        );
    }
  }
});

///////DELETE YOUR PHOTO/////////

router.delete("/api/delete/:id", async (req, res) => {
 
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
      const data = await db.Image.destroy({
        where: {
          id: req.params.id,
          UserId: tokenMatch.id,
        },
      }).catch((err) => res.status(404).json(err));
      res.status(200).json(data);
     
    } else {
      res
        .status(403)
        .json(
          "Authorization Error! You either do not have access or session has expired."
        );
    }
  }
});

//////GET ALL YOUR PHOTOS///////////

router.get("/api/yourphotos", async (req, res) => {
 
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
      const data = await db.Image.findAll({
        where: {
          UserId: tokenMatch.id,
        },
      }).catch((err) => res.status(404).json(err));
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

////////GET PHOTO YOU WANT TO EDIT//////////
router.get("/api/edit/:id", async (req, res) => {
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
      const data = await db.Image.findOne({
        where: {
          id: req.params.id,
          UserId: tokenMatch.id,
        },
      }).catch((err) => res.status(404).json(err));
     
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

/////////Update Image Route//////////
router.put("/api/updateImage", async (req, res) => {

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
      const data = await db.Image.update(req.body, {
        where: {
          id: req.body.id,
          UserId: tokenMatch.id,
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

///GET ALL PUBLIC PHOTOS////

router.get("/api/getpublic", async (req, res) => {
  const data = await db.Image.findAll({
    where: {
      public: true,
    },
  }).catch((err) => res.status(404).json(err));
  res.status(200).json(data);
});

module.exports = router;
