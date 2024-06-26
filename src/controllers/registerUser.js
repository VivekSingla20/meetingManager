const express = require("express");
const pool = require("../dbconfig");
const validator = require("validator");
const path = require("path");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../public/ejs"));
app.use(express.static(path.join(__dirname, "public/css")));

const successObject = {
  success: true,
  message: "Successfully Registered.",
};

const invalidEntry = {
  success: false,
  message: "Invalid Entry.",
};

const databaseError = {
  success: false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to Register. Please try again later.",
  },
};

const encryptPassword = async (memberPassword) => {
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(memberPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

const registerUser = async (req, res) => {
  const { firstName, lastName, memberGmail, memberPassword } = req.body;

  if (!validator.isEmail(memberGmail)) {
    res.status(400).json(invalidEntry);
    return;
  }

  try {
    const hashedPassword = await encryptPassword(memberPassword);

    const sql = `INSERT INTO member(firstName, lastName, memberGmail, memberPassword) VALUES (?, ?, ?, ?);`;
    pool.query(sql, [firstName, lastName, memberGmail, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(databaseError);
      } else {
        const tableName = result.insertId;
        const sql2 = `CREATE TABLE member${tableName} (
           Sno INT PRIMARY KEY AUTO_INCREMENT,
           Name VARCHAR(255),
           gmailId VARCHAR(255),
           eventTitle VARCHAR(255),
           eventStartingDateTime VARCHAR(255),
           eventCategory VARCHAR(255),
           eventEndingDateTime VARCHAR(255),
           meetingCategory VARCHAR(255),
           visibility VARCHAR(255)
        );`;
        pool.query(sql2, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json(databaseError);
          } else {
            res.json(successObject);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(databaseError);
  }
};

module.exports = registerUser;
