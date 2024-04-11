const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Inisialisasi Variabel
const app = express();
const v1 = "/api/v1/cms";
// End Variabel

// Inisialisasi Router
const authRouter = require("./app/api/v1/auth/router");
const categoriesRouter = require("./app/api/v1/categories/router");
const eventsRouter = require("./app/api/v1/events/router");
const imagesRouter = require("./app/api/v1/images/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");
const talentsRouter = require("./app/api/v1/talents/router");
const ticketsRouter = require("./app/api/v1/tickets/router");
// End Router

// Use package
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// End Use package

// Use Router
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to api Artistry Agora!",
  });
});

app.use(v1, authRouter);
app.use(v1, categoriesRouter);
app.use(v1, eventsRouter);
app.use(v1, imagesRouter);
app.use(v1, ordersRouter);
app.use(v1, participantsRouter);
app.use(v1, paymentsRouter);
app.use(v1, talentsRouter);
app.use(v1, ticketsRouter);
// End Use Router

module.exports = app;
