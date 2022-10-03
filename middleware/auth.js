const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(401).json({ msg: "No token authorization denied" });
  }

  //Verify TOKEN
  try {
    const decoded = jwt.decode(token, process.env.jwtSecret);
    req.kullanici =
      decoded.kullanici; /* const payload = {
        kullanici: {
          id: kullanici.id
        } */

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
