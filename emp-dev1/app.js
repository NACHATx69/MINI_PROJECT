var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require('body-parser')
const jsonparser = bodyParser.json()
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var addUserRouter = require("./routes/addUser");
var usersRouter = require("./routes/users");
var pages_contactRouter = require("./routes/page_contract");
var pages_blankRouter = require("./routes/page-blank");
var loginRouter = require("./routes/login");
var profileRouter = require("./routes/profile");
var registerRouter = require("./routes/register");
var faqRouter = require("./routes/faq");
var board_postRouter = require("./routes/board_post");
var careerRouter = require("./routes/career");
var careerDetailRouter = require("./routes/detail_career");
var jobDetailRouter = require("./routes/detail_job");
var applicationRouter = require("./routes/application");
var createJobDesRouter = require("./routes/createJobDescription");
var jobListRouter = require("./routes/jobList");
var authenRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", board_postRouter);
app.use("/users", usersRouter);
app.use("/faq", pages_contactRouter);
app.use("/contact", pages_contactRouter);
app.use("/pages-blank", pages_blankRouter);
app.use("/login",loginRouter);
app.use("/profile",profileRouter);
app.use("/register",registerRouter);
app.post("/welcome",addUserRouter);
app.use("/career",careerRouter);
app.use("/career_detail",careerDetailRouter);
app.use("/application",applicationRouter)
app.use("/createJobDescription",createJobDesRouter)
app.use("/jobList",jobListRouter)
app.use("/jobDetail",jobDetailRouter)
app.use("/login",jobDetailRouter)
app.use("/authen",authenRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
