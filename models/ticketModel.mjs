import mongoose from "mongoose";
import { type } from "os";

// Declare the Schema of the Mongo model
var ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  ticketNumber: {
    type: String,
    required: true,
  },
});

//Export the model
export default mongoose.model("Ticket", ticketSchema);
