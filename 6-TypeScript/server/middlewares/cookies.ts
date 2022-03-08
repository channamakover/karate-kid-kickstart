import { v1 as uuidv1 } from "uuid";

const checkCookies = function (req, res, next) {
  if (!req.cookies.userId) {
    const userId = uuidv1();
    req.body.userId = userId;
    // res.cookie("userId", userId,{httpOnly:false});
    // console.log("hii");
    // console.log("req.cookies",req.cookies);
    // res.send("cookies set");
    
  }
  next();
};

export default checkCookies;
