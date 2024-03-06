"use strict";
const router = require("express").Router();
// ? "Router" is special app for URL control in ExpressJS
// router app ile ayni calismaktadir ancak daha hafif bir sekilde modulerlik sagladigi icin routing mekanizmasinda(folder'lar ile calismada) cok onemli bir islev ustlenir.
const { Todo } = require("../models/todoModel");
const {
  list,
  read,
  create,
  update,
  destroy,
} = require("../controllers/todoController");

router
  .route("/")
  // ? get all todos
  .get(list)
  // ? create a todo
  .post(create);

router
  .route("/:id(\\d+)")
  // ? get single todo
  .get(read)
  // ? update a todo
  .put(update)
  .patch(update)
  // ? delete a todo
  .delete(destroy);

module.exports = router;
