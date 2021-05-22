import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  fetchProductsByIds,
  fetchProductsBySlug,
 
} from "../models/products/product.model.js";

/////fetch all products
router.get("/", async (req, res) => {
 

  try {
    const result = await getProducts();

    res.json({
      status: "success",
      message: "Here are all the products",
      result,
    });
  } catch (error) {
    throw error;
  }
});

///fetch products by slug name
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  console.log("from router slug", slug);

  try {
    const result = await fetchProductsBySlug(slug);

    res.json({
      status: "success",
      message: "Here are all the products",
      result,
    });  
  } catch (error) {
    throw error;
  }
});

////feth all products



export default router;
