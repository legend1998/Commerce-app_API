const dotenv = require("dotenv");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    const secret = req.headers.authorization;
    console.log(secret, SECRET_KEY);
    if (secret === SECRET_KEY) next();
    else {
      res.status(401).send({ success: false, error: "authorisation revoked" });
    }
  } catch (err) {
    res.status(401).send({ success: false, error: err });
  }
};

module.exports = auth;
