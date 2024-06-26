const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const registerUser = require("./controllers/registerUser");
const loginUser = require("./controllers/loginUser");
const createMeetingPublic = require("./controllers/createMeetingPublic");
const addToMyConference = require("./controllers/addToMyConference");
const getAllConferences = require("./controllers/getAllConferences");
const getMyConferences = require("./controllers/getMyConferences");
const getUserDetails = require("./controllers/getUserDetails");
const authoriseToken = require("./middleware/authoriseToken");
const checkUser = require("./middleware/checkUser");
const { checkServerIdentity } = require("tls");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080", // Replace with your allowed origin
  methods: ["GET", "POST"], // Allow only GET and POST requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
  credentials: true, // Allow cookies and HTTP authentication
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../public/ejs"));

// Middleware to serve CSS files with the correct MIME type
app.use("/css", (req, res, next) => {
  res.header("Content-Type", "text/css");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use("/css", express.static(path.join(__dirname, "../css")));

// Render GETS
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/loginPage", (req, res) => {
  res.render("login");
});
app.get("/createMeeting", checkUser, (req, res) => {
  res.render("createMeeting");
});
app.get("/myConferences", checkUser, (req, res) => {
  res.render("myConferences");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/home", checkUser, (req, res) => {
  res.render("home");
});
app.get("/showAllConferences", checkUser, (req, res) => {
  res.render("allConferences");
});
app.get("/profile", checkUser, (req, res) => {
  res.render("profile");
});

// Controller GETS
app.get("/authoriseToken", authoriseToken, (req, res) => {
  // return response
});
app.get("/checkUser", checkUser, (req, res, next) => {
  // Here next() is implemented;
});
app.get("/getUserDetails", checkUser, getUserDetails);
app.get("/login", loginUser); // Changed from loginUser, authoriseToken to loginUser only
app.get("/getMyConferences", checkUser, getMyConferences);
app.get("/getAllConferences", checkUser, getAllConferences);

// POSTS
app.post("/createMeetingPublic", checkUser, createMeetingPublic);
app.post("/addToMyConference", checkUser, addToMyConference);
app.post("/register", registerUser);

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    domain: req.hostname,
  });
  res.redirect("/");
});

module.exports = app;

app.listen(8080, () => {
  console.log("Server Connected");
});
