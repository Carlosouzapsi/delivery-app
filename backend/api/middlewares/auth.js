const { ValidateSignature } = require("../../utils/utils");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);
  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ success: false, message: "Not Authorized" });
};
