const mongoose = require("mongoose");
const { urlDb } = require("../config/mongoConfig");

mongoose.connect(urlDb);

const db = mongoose.connection;

module.exports = db;
