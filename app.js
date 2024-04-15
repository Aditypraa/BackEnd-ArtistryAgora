const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Inisialisasi Variabel
const app = express();
// End Variabel

// Middleware
const notFoundMiddlewares = require("./app/middlewares/notFoundMiddlewares");
const handleErrorMiddlewares = require("./app/middlewares/handlerErrorMiddlewares");
// End Middleware

// Inisialisasi Router
const v1 = "/api/v1/cms";

const authRouter = require("./app/api/v1/auth/authRouter");
const categoriesRouter = require("./app/api/v1/categories/categoriesRouter");
const eventsRouter = require("./app/api/v1/events/eventsRouter");
const imagesRouter = require("./app/api/v1/images/imagesRouter");
const ordersRouter = require("./app/api/v1/orders/ordersRouter");
const participantsRouter = require("./app/api/v1/participants/participantsRouter");
const paymentsRouter = require("./app/api/v1/payments/paymentsRouter");
const talentsRouter = require("./app/api/v1/talents/talentsRouter");
const ticketsRouter = require("./app/api/v1/tickets/ticketsRouter");
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

// app.use(v1, authRouter);
app.use(v1, categoriesRouter);
// app.use(v1, eventsRouter);
app.use(v1, imagesRouter);
// app.use(v1, ordersRouter);
// app.use(v1, participantsRouter);
// app.use(v1, paymentsRouter);
// app.use(v1, talentsRouter);
// app.use(v1, ticketsRouter);
// End Use Router

// Use Middleware
app.use(notFoundMiddlewares);
app.use(handleErrorMiddlewares);
// End Middleware

module.exports = app;
