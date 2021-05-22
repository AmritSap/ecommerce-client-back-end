import jwt from "jsonwebtoken";
import { storeRefreshJWT } from "../models/newUser/NewUser.model.js";
import { storeAccessJwt } from "../models/session/session.model.js";

export const createAccessJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "15m",
      });
      if (accessJWT) {
        const session = {
          accessJWT,
          userId: _id,
        };
        storeAccessJwt(session);
      }

      resolve(accessJWT);
    } catch (error) {
      reject(error);
    }
  });
};

export const createRefreshJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshJWT = await jwt.sign(
        { email },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "30d" }
      );
      storeRefreshJWT(refreshJWT, _id);
      resolve(refreshJWT);
    } catch (error) {
      reject(error);
    }
  });
};


export const verifyAccessJWT = (accessJWT) => {
  try {
    const decoded = jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
    return Promise.resolve(decoded);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const verifyRefreshJWT = (refreshJWT) => {
  try {
    const decoded = jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
    return Promise.resolve(decoded);
  } catch (error) {
    return Promise.reject(false);
  }
};