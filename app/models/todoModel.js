"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:./db.sqlite3");

const Todo = sequelize.define(
  "todo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    priority: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);

module.exports = { sequelize, DataTypes, Todo };
