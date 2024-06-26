const pool = require("../dbconfig");

const successObject = {
  success: true,
  message: "Successfully Created Conference.",
};

const createMeetingPublic = (req, res) => {
  let name = req.body.name;
  let gmail = req.body.gmail;
  let eventTitle = req.body.eventTitle;
  let eventStartingDateTime = req.body.eventStartingDateTime;
  let eventCategory=req.body.eventCategory;
  let eventEndingDateTime = req.body.eventEndingDateTime;
  let visibility = req.body.visibility;

  let values = [
    name,
    gmail,
    eventTitle,
    eventStartingDateTime,
    eventCategory,
    eventEndingDateTime,
    visibility,
  ];

  let sql = `INSERT INTO Userconferences (Name,gmailId,eventTitle,eventStartingDateTime,eventCategory,eventEndingDateTime,meetingCategory,visibility) VALUES ("${name}","${gmail}","${eventTitle}","${eventStartingDateTime}","${eventCategory}","${eventEndingDateTime}","Register","${visibility}");`;
  pool.query(sql, values, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      res.send(successObject);
    }
  });
};
module.exports=createMeetingPublic;
