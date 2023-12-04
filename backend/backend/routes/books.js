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
  const books = await db.sequelize.query(
    // "select books.id,title from books left join lendings l on books.id = l.book_id left join users u on l.user_id = u.id;",
    "select books.id,title from books;",
    { type: db.sequelize.QueryTypes.SELECT }
  );

  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const book = await db.sequelize.query(
    "select title,authors,publishedYear,thumbnail,name as status from books left join lendings l on books.id = l.book_id left join users u on l.user_id = u.id where books.id=$book_id;",
    {
      bind: { book_id: req.params.id },
      type: db.sequelize.QueryTypes.SELECT,
      plain: true,
    }
  );

  if (book === null) {
    res.status(404).send("Book not found");
    return;
  }

  if (book.status === null) {
    book.status = "";
  }

  res.json(book);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const book = {
    title: body.title,
    authors: body.authors,
    thumbnail: body.thumbnail,
    publishedYear: body.publishedYear,
  };

  try {
    const b = await db.books.create(book);
    await db.counts.create({
      book_id: b.id,
    });
  } catch (e) {
    // console.error(e);
  }

  res.status(201).send();
});

router.delete("/", async (req, res, next) => {
  const book = await db.books.findOne({ where: { id: req.query.id } });
  book.destroy();
  res.status(204).send();
});

module.exports = router;
