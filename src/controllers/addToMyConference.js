// addToMyConference.js
const pool = require("../dbconfig");
const jwt = require("jsonwebtoken");
const app= require("../index")
const successObject = {
  success: true,
  message: "Successfully added to my Conferences.",
};

const addToMyConference = (req, res) => {
  let name = req.body.name;
  let gmail = req.body.gmail;
  let eventTitle = req.body.eventTitle;
  let eventStartingDateTime = req.body.eventStartingDateTime;
  let eventCategory = req.body.eventCategory;
  let eventEndingDateTime = req.body.eventEndingDateTime;
  const decodedToken = jwt.decode(req.cookies.token);
  const id= decodedToken.id;
  const sql = `INSERT INTO member${id} (
    Name,
    gmailId,
    eventTitle,
    eventStartingDateTime,
    eventCategory,
    eventEndingDateTime,
    meetingCategory
  ) VALUES (?, ?, ?, ?, ?, ?, 'Upcoming')`;

  let values = [
    name,
    gmail,
    eventTitle,
    eventStartingDateTime,
    eventCategory,
    eventEndingDateTime,
  ];

  pool.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error while adding to my Conferences:", err);
      res.status(500).json({ success: false, message: "Error adding to my Conferences." });
    } else {
      res.status(200).json(successObject);
    }
  });
};

module.exports = addToMyConference;
