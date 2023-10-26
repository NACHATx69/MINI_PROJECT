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

var mange_permissionRouter = require("./routes/mange_permission");
var mange_employeeRouter = require("./routes/mange_employee");

var careerRouter = require("./routes/career_posted");
var careerDetailRouter = require("./routes/career_postedDetail");
var createJobDesRouter = require("./routes/career-createPost");
var createRequestRouter = require("./routes/career-requrestList");
var creatSaveToSqltRouter = require("./routes/career-createPostToSql");

var applicationRouter = require("./routes/applicant-application");
var applicantProfileRouter = require("./routes/applicant-profile");
var applicantInterviewRouter = require("./routes/applicant-interviewList");
var applicantInterviewResultRouter = require("./routes/applicant-interviewResult");

var reportApplicantRouter = require("./routes/report_applicant");
var reportEmployeeRouter = require("./routes/report_emp");

// 
var interRouter = require("./routes/page_interview");
var addInterRouter = require("./routes/addinter");
var comfirm_inter = require("./routes/confirm_interview");
var addRecordRouter = require("./routes/addrecordRoutes");
//

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
app.use("/career_request",createRequestRouter);
app.use("/career_detail",careerDetailRouter);
app.use("/createJobDescription",createJobDesRouter)
app.post("/requestEmp",creatSaveToSqltRouter)


app.use("/application",applicationRouter)
app.post("/application",applicationRouter)
app.use("/applicant-profile",applicantProfileRouter)
app.use("/applicant-interviewList",applicantInterviewRouter)
app.use("/applicant-interviewResult",applicantInterviewResultRouter)

app.use("/report-applicant",reportApplicantRouter)
app.use("/report-employee",reportEmployeeRouter)

app.use("/mange_permission",mange_permissionRouter)
app.post("/mange_permission",mange_permissionRouter)
app.use("/mange_employee",mange_employeeRouter)
app.use("/manage-data",roletRouter)

app.post("/inter", addInterRouter);
app.post("/add_record", addRecordRouter);
app.use("/confirm_interview", comfirm_inter);

app.use("/pages-interview", interRouter);
// 

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
