import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ticketAvailable: {
      type: Number,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("Event", eventSchema);
