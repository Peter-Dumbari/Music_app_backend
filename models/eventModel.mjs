import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ticketTypes: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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
