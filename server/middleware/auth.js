import ENV from "../config.js";
import jwt from "jsonwebtoken";

export  async function checkUser(req, res) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];
    // verify token using secret key from config file
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    if(decodedToken){
        res.status(200).send({isValid: true});
    }else{
        res.status(400).send({isValid: false});
    }
  } catch (error) {
    res.status(500).send({isValid: false});
  }
}


/** auth middleware */
export async function Auth(req, res, next){
  try {
      
      // access authorize header to validate request
      const token = req.headers.authorization.split(" ")[1];
      // retrive the user details fo the logged in user
      const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
      req.user = decodedToken;

      next()
  } catch (error) {
      res.status(401).json({ error : "Authentication Failed!"})
  }
}