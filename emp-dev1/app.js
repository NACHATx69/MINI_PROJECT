var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var addUserRouter = require("./routes/addUser");
var usersRouter = require("./routes/users");
var pages_contactRouter = require("./routes/page_contract");
var pages_blankRouter = require("./routes/page-blank");
var loginRouter = require("./routes/login");
var profileRouter = require("./routes/profile");
var registerRouter = require("./routes/register");
var testCode_gameRouter = require("./routes/testCode_game");
var testCode_skyRouter = require("./routes/testCode_sky");
var testCode_ohmRouter = require("./routes/testCode_ohm");
var faqRouter = require("./routes/faq");
var board_postRouter = require("./routes/board_post");

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
app.use("/contact", pages_contactRouter);
app.use("/pages-blank", pages_blankRouter);
app.use("/login",loginRouter);
app.use("/profile",profileRouter);
app.use("/register",registerRouter);
app.use("/game",testCode_gameRouter);
app.use("/sky",testCode_skyRouter);
app.use("/ohm",testCode_ohmRouter);
app.use("/faq",faqRouter);
app.post("/welcome",addUserRouter);

app.post('/submit', (req, res) => {
  var EMP_ID = req.body.EMP_ID;
  var FNAME = req.body.FNAME;
  var LNAME = req.body.LNAME;
  var DEPARTMENT = req.body.DEPARTMENT;
  var POSITION = req.body.POSITION;
  var PERMISTION = req.body.PERMISTION;
  var MGR_ID = req.body.MGR_ID;
  var USERNAME = req.body.USERNAME;
  var PASS    = req.body.PASS;
  var HIREDATE = req.body.HIREDATE;
  var EXITDATE = req.body.EXITDATE;
  const registerData = {
    'EMP_ID': EMP_ID,
    'FNAME': FNAME,
    'LNAME': LNAME,
    'DEPARTMENT': DEPARTMENT,
    'POSITION': POSITION,
    'PERMISTION': PERMISTION,
    'MGR_ID': MGR_ID,
    'USERNAME': USERNAME,
    'PASS': PASS,
    'HIREDATE': HIREDATE,
    'EXITDATE': EXITDATE
  };
  
  console.log(registerData); // ใช้ console.log() เพื่อตรวจสอบข้อมูลในคอนโซล

  res.send(`คุณเลือก: ${registerData.EMP_ID}`); // เรียกใช้งาน template engine เพื่อแสดงข้อมูลที่ถูกสร้างขึ้น
});


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
