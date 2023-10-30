var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require('body-parser')
const jsonparser = bodyParser.json()
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var board_postRouter = require("./routes/home");

var addUserRouter = require("./routes/page-registerCreateUser");
var loginRouter = require("./routes/page-login");
var registerRouter = require("./routes/page-register");
var authenRouter = require("./routes/page-login_auth");
var singoutRouter = require("./routes/page-singout");
var roletRouter = require("./routes/manage-data");

var profileRouter = require ("./routes/page-profile");

var careerRouter = require("./routes/career_posted");
var careerApproveRouter = require("./routes/career_postApprov");
var careerDetailRouter = require("./routes/career_postedDetail");
var createJobDesRouter = require("./routes/career-createPost");
var createRequestRouter = require("./routes/career-requrestList");
var createRequestDetailRouter = require("./routes/career-requrestListDtail");
var creatSaveToSqltRouter = require("./routes/career-createPostToSql");

var applicationRouter = require("./routes/applicant-application");
var applicantProfileRouter = require("./routes/applicant-list");
var applicantProfileDetailRouter = require("./routes/applicant-profile");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));
app.set("public", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", board_postRouter);
app.use("/login",loginRouter);
app.use("/register",registerRouter);
app.post("/welcome",addUserRouter);
app.use("/authen",authenRouter)
app.use("/singout",singoutRouter)
app.use("/role",roletRouter)

app.use("/career",careerRouter);
app.use("/career_approve",careerApproveRouter);
app.use("/career_request",createRequestRouter);
app.use("/career_request-dtail",createRequestDetailRouter);
app.use("/career_detail",careerDetailRouter);
app.use("/createJobDescription",createJobDesRouter)
app.post("/requestEmp",creatSaveToSqltRouter)


app.use("/application",applicationRouter)
app.use("/applicant-profile",applicantProfileRouter)
app.use("/applicant-profileApplication",applicantProfileDetailRouter)

app.use("/manage-data",roletRouter)
app.use("/profile", profileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const post ={
    content: '../pages/page-error404',
  }
  res.status(404).render('layouts/base-login', { post: post });
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
