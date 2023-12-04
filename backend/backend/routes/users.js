const { json } = require("express");
var express = require("express");
var router = express.Router();

const db = require("../models/index");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

router.get("/", async (req, res, next) => {
  const users = await db.users.findAll();
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  let lendings = [];
  try {
    lendings = await db.sequelize.query(
      "select title,b.id from lendings join books b on lendings.book_id = b.id join users u on lendings.user_id = u.id where user_id=$user_id;",
      {
        bind: { user_id: req.params.id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400);
  }

  res.status(200).json(lendings);
});

router.post("/", async (req, res, next) => {
  try {
    await db.users.create({ name: req.query.name });
  } catch (e) {
    console.log(e);
    res.status(400).send("User already exists");
    return;
  }

  const u = await db.users.findOne({ where: { name: req.query.name } });

  res.status(201).send({ id: u.id });
});

router.post("/admin", (req, res, next) => {
  if (req.body.password === "admin") {
    res.status(200).send();
    return;
  }
  res.status(401).send();
});

module.exports = router;
