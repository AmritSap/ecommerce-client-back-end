import bcrypt from "bcrypt";

const saltRounds = 10;
export const hassPassword = (plainPassword) => {
  console.log("from password",plainPassword)
  return new Promise((resolve, reject) => {
    try {
      resolve(bcrypt.hashSync(plainPassword, saltRounds));
    } catch (error) {
      reject(error);
    }
  });
};

export const comparePassword = (plainPassword, hashedPassFromDB) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.compare(plainPassword, hashedPassFromDB, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};
