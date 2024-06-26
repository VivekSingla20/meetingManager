const jwt = require("jsonwebtoken");

const checkUser =  (req, res, next) => {
  const token =  req.cookies.token;
  if (token) {
    jwt.verify(token, "Secret JWT Code", (err, decodedToken) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(498).json({ success: false, message: "Token verification failed" });
      } else {
        console.log("JWT verification successful:", decodedToken);
        req.userId = decodedToken.id; // Attach user ID to the request object
        
        // Send user ID as a response
         next();
      }
    });
  } else {
    console.error("Token not found");
    return res.status(498).json({ success: false, message: "Token not provided" });
  }
};

module.exports = checkUser;
