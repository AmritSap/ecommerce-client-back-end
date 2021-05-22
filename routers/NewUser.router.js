import express from "express";
const router = express.Router();
import { createUser } from "../models/newUser/NewUser.model.js";
import { hassPassword } from "../helpers/passwordBycrypt.helpers.js";
import { newUserValidation } from "../middlewares/formValidation.midleware.js";

router.post("/", newUserValidation,async (req, res) => {
  try {
  

    const { password } = req.body;
    const hassPass = await hassPassword(password);
    const newUser = { ...req.body, password: hassPass };
    const result = await createUser(newUser);
   

    if (result?._id) {
      return res.json({
        status: "success",
        message:
          "New account created.Now you can login using email and password",
        result,
      });
    }
    res.json({ status: "error", message: "Unable to cretae account" });
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error collection")) {
      return res.json({
        status: "error",
        message: "This email already exists.Please enter another email",
      });
    }
    throw new Error(error.message);
  }
});
export default router;
