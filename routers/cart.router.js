import express from "express";
const router = express.Router();

import { fetchProductsByIds } from "../models/products/product.model.js";

router.post("/", async (req, res) => {
  const { ids } = req.body;
  console.log("from cart",ids);
  try {
    const result = await fetchProductsByIds(ids);

    res.json({
      status: "success",
      message: "Here are all the products in tha cart",
      result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
