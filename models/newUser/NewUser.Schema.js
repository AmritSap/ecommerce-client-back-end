import mongoose from "mongoose";

const NewUserSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      require: true,
      default: "",
    },
    lName: {
      type: String,
      require: true,
      default: "",
    },
    email: {
      type: String,
      // index: 1,
      unique: true,
      require: true,
      default: "",
    },

    password: {
      type: String,
      require: true,
      default: "",
    },
    address: {
      type: String,
      require: true,
      default: "",
    },

    refreshJWT: {
      token: { type: String, require: true, default: "" },
      addedAt: {
        type: Date,
        require: true,

        default: Date.now(),
      },
    },
  },
  {
    timestamp: true,
  }
);
// this will convert the schema into real table as the table name users
export const ClientUser = mongoose.model("New_User", NewUserSchema);
