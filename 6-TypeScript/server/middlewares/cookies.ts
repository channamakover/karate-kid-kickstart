import { v1 as uuidv1 } from "uuid";

const checkCookies = function (req, res, next) {
  if (!req.cookies.userId) {
    const userId = uuidv1();
    req.body.userId = userId;
  }
  next();
};

export default checkCookies;
