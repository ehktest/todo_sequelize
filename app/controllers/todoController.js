"use strict";

const { Todo } = require("../models/todoModel");

module.exports = {
  list: async (req, res) => {
    const data = await Todo.findAndCountAll({});

    res.status(200).json({
      error: false,
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await Todo.findByPk(parseInt(req.params.id));

    res.status(200).json({
      error: false,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await Todo.create(req.body);

    res.status(201).json({
      error: false,
      result: data.dataValues,
    });
  },

  update: async (req, res) => {
    const data = await Todo.update(req.body, { where: { id: req.params.id } });

    res.status(202).json({
      error: false,
      message: "Updated",
      body: req.body,
      result: data,
      new: await Todo.findByPk(parseInt(req.params.id)),
    });
  },

  destroy: async (req, res) => {
    const data = await Todo.destroy({ where: { id: req.params.id } });

    if (data !== 0) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Not Found");
    }
  },
};
