import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).json({ error: "Token not provided" });
  }
  return next();
};
