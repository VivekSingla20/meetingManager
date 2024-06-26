// const pool = require("../dbconfig");
// const validator = require("validator");
// const bcrypt= require("bcryptjs");
// const createToken = require("../utils/createToken");

// const successObject = {
//   success: true,
//   message: "Successfully Logged In.",
// };

// const invalidEntry = {
//   success: false,
//   message: "Invalid Entry.",
// };

// const databaseError = {
//   success: false,
//   error: {
//     code: "ERR_DATABASE",
//     message: "Failed to Login. Please try again later.",
//   },
// };

// const loginUser = async (req, res) => {
//   let userGmail = req.query.memberGmail;
//   let EnteredPassword = req.query.memberPassword;

//   if (validator.isEmail(userGmail)) {
//     const sql = `SELECT memberPassword, Sno FROM member WHERE memberGmail="${userGmail}";`;
//     pool.query(sql, async (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json(databaseError);
//       }

//       if (result.length === 0) {
//         // User not found
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       const isPasswordValid = await bcrypt.compare(EnteredPassword, result[0].memberPassword);
//       if (isPasswordValid) {
//         const token = createToken(result[0].Sno); // Generate JWT token
//         res.cookie("jwt", token, {
//           httpOnly: true,
//           maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
//         });
//         res.json(successObject);
//       } else {
//         res.status(400).json({ success: false, message: "Incorrect password" });
//       }
//     });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid email format" });
//   }
// };

// module.exports = loginUser;
const pool = require("../dbconfig");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

const successObject = {
  success: true,
  message: "Successfully Signed In.",
};

const databaseError = {
  success: false,
  error: {
    code: "ERR_DATABASE",
    message: "Failed to login. Please try again later.",
  },
};

const loginUser = async (req, res, next) => {
  let userGmail = req.query.memberGmail;
  let enteredPassword = req.query.memberPassword;

  if (!validator.isEmail(userGmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const sql = `SELECT Sno, memberPassword FROM member WHERE memberGmail = ?`;
    pool.query(sql, [userGmail], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(databaseError);
      }

      if (result.length === 0) {
        return res.status(404).json(databaseError);
      }

      const isPasswordValid = await bcrypt.compare(
        enteredPassword,
        result[0].memberPassword
      );

      if (isPasswordValid) {
        const token = createToken(result[0].Sno);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
          secure: true,
        });
        res.json(successObject);
      } else {
        res.status(400).json(databaseError);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(databaseError);
  }
};

module.exports = loginUser;
