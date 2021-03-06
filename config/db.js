import mongoose from "mongoose";

const mongoClient = async () => {
  const conn = await mongoose.connect(process.env.MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  if (conn) {
    console.log(" mongo dbconnected");
  }
};
export default mongoClient;
