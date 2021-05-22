import CategorySchema from "./Category.Schema.js";

export const getCategories = () => {
 
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.find();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
