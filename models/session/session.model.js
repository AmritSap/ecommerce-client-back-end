import SchemaSession from "./Session.schema.js";

export const storeAccessJwt = async (newSession) => {
  console.log("from session", newSession);
  try {
    const result = await SchemaSession(newSession).save();
    return result;
  } catch (error) {
    reject(error);
  }
};

export const getAccessJWTByToken = async (accessJWt) => {
  try {
    const result = await SchemaSession.findOne({ accessJWt });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const deleteAccessJwtByUserId = (userId) => {
  console.log("from session model", userId);
  try {
    SchemaSession.findOneAndDelete(userId);
  } catch (error) {
    console.log(error);
  }
};
