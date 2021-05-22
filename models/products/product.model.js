import ProdSchema from "./Product.schema.js";

export const getProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find({
        categories: { $in: _id },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchProductsByIds = (id) => {
  console.log(id);

  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findById
      ({
        _id: {
          $in: id,
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchProductsBySlug = (slugValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find({
        slug: {
          $in: slugValue,
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
