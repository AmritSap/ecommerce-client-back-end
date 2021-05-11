import { ClientUser } from "./NewUser.Schema.js";

export const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("from model", userObj);
      ClientUser(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUser.findOne({ email })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const storeRefreshJWT = (token, _id) => {
  console.log("frommodel", token);
  return new Promise((resolve, reject) => {
    try {
      ClientUser.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
