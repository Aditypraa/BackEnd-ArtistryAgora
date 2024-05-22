// 1. Import mongoose
const mongoose = require("mongoose");

// 2. Import Konfigurasi terkait mongoDB dari app/config/mongoConfig.js
const { urlDb } = require("../config/mongoConfig");

// 3. Koneksikan ke mongoDB menggunakan konfigurasi yang telah diimport
mongoose.connect(urlDb);

// 4. Simpan koneksi ke variabel db
const db = mongoose.connection;

// 5. Export db supaya bisa digunakan di file yang lain yang membutuhkan koneksi ke mongoDB
module.exports = db;
