import express from "express";
const router = express.Router();
import { getUserByEmailAndRefeshJWT,getUserByEmail} from "../models/newUser/NewUser.model.js";

import { verifyRefreshJWT, createAccessJWT } from "../jwthelpers/jwthelpers.js";
// import { JsonWebTokenError } from "jsonwebtoken";

router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      // Process: call the function to get the accessjwt
      console.log("hello");
      // 1. verify storeRefreshJWT
      const { email } = await verifyRefreshJWT(authorization);

      // 3. find out the user who the code belongs to
      if (email) {
        // 2. check if it is in the database
        const user = await getUserByEmailAndRefeshJWT({
          email,
          refreshJWT: authorization,
        });

        if (user?._id) {
          const tokenExp = user.refreshJWT.addedAt;
          tokenExp.setDate(
            tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
          );
          const today = Date.now();
          // check if token is still valid
          if (tokenExp > today) {
            // 4. cretae new accessJWT and store in the seesion table in BD
            const accessJwt = await createAccessJWT(email, user._id);
            return res.json({
              status: "success",
              message: "Here is your new accessJWT",
              accessJwt,
            });

            // 3. find out the user who the code belongs to
          }
        }
      }
    }

    res.status(403).json({
      status: "error",
      message: "Unauthorized!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "error",
      message: "Unauthorized!",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      const { email } = await verifyRefreshJWT(token);

      if (email) {
        // 2. check if it is in the database
        const user = await getUserByEmail(email);
        if (user._id) {
          return res.json({
            status: "success",
            message: "Here is the user Details",
            user,
          });
        }
      }
    }
  } catch (error) {
    res.status(403).json({
      status: "error",
    });
  }
});
export default router;
