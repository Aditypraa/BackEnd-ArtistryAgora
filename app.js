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

const categoriesRouter = require("./app/api/v1/categories/categoriesRouter");
const eventsRouter = require("./app/api/v1/events/eventsRouter");
const imagesRouter = require("./app/api/v1/images/imagesRouter");
const talentsRouter = require("./app/api/v1/talents/talentsRouter");

// CMS
const organizersRouter = require("./app/api/v1/organizers/organizersRouter");
const authRouter = require("./app/api/v1/auth/authRouter");
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

app.use(v1, categoriesRouter);
app.use(v1, eventsRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);

// CMS
app.use(v1, organizersRouter);
app.use(v1, authRouter);

// End Use Router

// Use Middleware
app.use(notFoundMiddlewares);
app.use(handleErrorMiddlewares);
// End Middleware

module.exports = app;
