import RevSchema from "./reviews.schema.js";

export const insertReviews = (reviewsObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(reviewsObj);
      const { data } = await RevSchema({ reviews: reviewsObj })
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const getReviewsByProductId = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await RevSchema.find({
        productId: { $in: _id },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
