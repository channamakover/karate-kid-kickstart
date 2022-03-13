import { Chance } from "chance";
import { Request, Response } from "express";

const addCookie = function (req: Request, res: Response, next) {
  let userIdCookie = req.cookies.userId;
  if (!userIdCookie) {
    userIdCookie = Chance().guid();
    req.cookies.userId = userIdCookie;
    res.cookie("userId", userIdCookie);
  }
  next();
};
export default addCookie;
