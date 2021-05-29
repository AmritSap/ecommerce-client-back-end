import express from "express";
const router = express.Router();
import {
  insertReviews,
  getReviewsByProductId,
} from "../models/reviews/reviews.model.js";

/////fetch all products
router.post("/", async (req, res) => {
  try {
    const { reviewsData } = req.body;

    console.log("from router", reviewsData);
    const result = await insertReviews(reviewsData);

    res.json({
      status: "success",
      message: "Reviews added",
    });
  } catch (error) {
    throw error;
  }
});

export default router;
