import express from "express";
const router = express.Router();

import { getUserByEmail } from "../models/newUser/NewUser.model.js";
import { comparePassword } from "../helpers/passwordBycrypt.helpers.js";
import { createAccessJWT, createRefreshJWT } from "../jwthelpers/jwthelpers.js";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);
    if (!result?._id) {
      return res.json({
        status: "error",
        message: "id Invalid login details",
      });
    }
    const hassedPasswordFromDb = result.password;
    console.log(hassedPasswordFromDb);
    //compare the password
    const checkPassword = await comparePassword(password, hassedPasswordFromDb);
    if (!checkPassword) {
      return res.json({
        status: "error",
        message: " password Invalid login details",
      });
    }
    const accessJWt = await createAccessJWT(result.email, result._id);
    const refreshJWT = await createRefreshJWT(result.email, result._id);

    result.password = undefined;
    res.json({
      status: "success",
      message: "login success",
      accessJWt,
      refreshJWT,
    });
  } catch (error) {
    -console.log(error);
  }
});

export default router;