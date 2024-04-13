const mongoose = require("mongoose");
const { urlDb } = require("../config/mongo.config");

mongoose.connect(urlDb);

const db = mongoose.connection;

module.exports = db;
