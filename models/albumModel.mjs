//mdbgum: for creating a new model
import mongoose from "mongoose";

// Declare the Schema of the Mongo model
let albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    thumbnail: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timeStamps: true,
  }
);

//Export the model
export default mongoose.model("Album", albumSchema);
