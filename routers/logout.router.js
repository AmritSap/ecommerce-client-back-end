
import express from "express";
const router = express.Router();

import { deleteRefreshJwtByUserId } from "../models/newUser/NewUser.model.js";
import { deleteAccessJwtByUserId } from "../models/session/session.model.js";

router.post("/", async (req, res) => {
  try {
    const { _id } = req.body;

    deleteAccessJwtByUserId(_id);

    // delete refreshJWT from user
    deleteRefreshJwtByUserId(_id);
    res.send({ status: "sucess", message: "logout" });
  } catch (error) {
    res.send({ status: "error", message: "SOMETHGING WORNG" });
  }
});

export default router;
