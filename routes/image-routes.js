const router = require("express").Router();
const db = require("../models");

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
      const data = await db.Image.create(req.body).catch((err) =>
        res.status(404).json(err)
      );
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

router.get("/api/getpublic", async (req, res) => {
  const data = await db.Image.findAll({
    where: {
      public: true,
    },
  }).catch((err) => res.status(404).json(err));
  res.json(data);
});

module.exports = router;