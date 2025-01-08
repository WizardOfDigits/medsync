import { getUser } from "../utils/auth.js";

function checkForAuthentication(req, res, next) {
  const cookieToken = req.cookies?.token;
  req.user = null;
  if (!cookieToken) {
    return next();
  }
  const token = cookieToken;
  const user = getUser(token);
  if (!user) {
    return res.json({ message: "User not found" });
  }
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    //TODO: redirect to login page
    if (!req.user) {
      return res.json({ message: "User not found" });
    }
    if (!roles.includes(req.user.role)) {
      return res.json({ message: "Unauthorized" });
    }
    return next();
  };
}
export { checkForAuthentication, restrictTo };
