import express from "express";
const router = express.Router();

import { getUserByEmail } from "../models/newUser/NewUser.model.js";
import { comparePassword } from "../helpers/passwordBycrypt.helpers.js";
import { createAccessJWT, createRefreshJWT } from "../jwthelpers/jwthelpers.js";
import { loginValidation } from "../middlewares/formValidation.midleware.js";


router.post("/", loginValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);
    if (!result?._id) {
      return res.json({
        status: "error",
        message: " Invalid login details",
      });
    }
    const hassedPasswordFromDb = result.password;

    //compare the password
    const checkPassword = await comparePassword(password, hassedPasswordFromDb);
    if (!checkPassword) {
      return res.json({
        status: "error",
        message: " invalid login details",
      });
    }
    const accessJWT = await createAccessJWT(result.email, result._id);
    const refreshJWT = await createRefreshJWT(result.email, result._id);

    result.password = undefined;
    res.json({
      status: "success",
      message: "login success",
      accessJWT,
      refreshJWT,
      result: result._id,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export default router;
