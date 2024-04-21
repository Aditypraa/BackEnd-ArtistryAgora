const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Inisialisasi Variabel
const app = express();
// End Variabel

// Inisialisasi Router
const v1 = "/api/v1";

const categoriesRouter = require("./app/api/v1/categories/categoriesRouter");
const eventsRouter = require("./app/api/v1/events/eventsRouter");
const imagesRouter = require("./app/api/v1/images/imagesRouter");
const talentsRouter = require("./app/api/v1/talents/talentsRouter");
const orderRouter = require("./app/api/v1/orders/ordersRouter");

// CMS
const organizersRouter = require("./app/api/v1/organizers/organizersRouter");
const authRouter = require("./app/api/v1/auth/authRouter");
const participantsRouter = require("./app/api/v1/participants/participantsRouter");
// End CMS
// End Inisialisasi Router

// Middleware
const notFoundMiddlewares = require("./app/middlewares/notFoundMiddlewares");
const handleErrorMiddlewares = require("./app/middlewares/handlerErrorMiddlewares");
// End Middleware

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

// CMS
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, orderRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authRouter);
// end CMS

app.use(`${v1}`, participantsRouter);

// Use Middleware
app.use(notFoundMiddlewares);
app.use(handleErrorMiddlewares);
// End Middleware
// End Use Router

module.exports = app;
