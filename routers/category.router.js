import express from "express";
const router = express.Router();
import { getCategories } from "../models/category/category.model.js";
import { getProductById } from "../models/products/product.model.js";

router.get("/", async (req, res) => {
  try {
    const result = await getCategories();

    res.json({
      status: "success",
      message: "Here are all the categories",
      result,
    });
  } catch (error) {
    throw error;
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log("from get a product", _id);

  try {
    const result = await getProductById(_id);

    res.json({
      status: "success",
      message: "Here are all the products",
      result,
    });
  } catch (error) {
    throw error;
  }
});
export default router;
