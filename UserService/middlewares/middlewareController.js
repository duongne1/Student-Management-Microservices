const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = {
  verifyToken: (req, res, next) => {
    let token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ error: "Bạn cần Login." });
    }
    try {
      if (token === undefined) {
        token = req.headers["authorization"];
        console.log(token);
        token = token.split(" ")[1];
      }

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Bạn không có quyền" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid Token" });
    }
  },

  //   verifyToken: (req, res, next) => {
  //     const token = req.headers.token;
  //     if (token) {
  //       const accessToken = token.split(" ")[1];
  //       jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
  //         if (err) {
  //           return res.status(403).json("Token is not valid");
  //         }
  //         req.user = user;
  //         next();
  //       });
  //     } else {
  //       return res.status(401).json("You're not authenticated");
  //     }
  //   },
};

module.exports = middleware;
