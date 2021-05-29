import mongoose from "mongoose";

const ReviewsSchema = mongoose.Schema(
  {
    reviews: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamp: true,
  }
);

const RevSchema = mongoose.model("Review", ReviewsSchema);

export default RevSchema;
