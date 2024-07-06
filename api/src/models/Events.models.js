import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      default: "Ongoing",
    },
    event_date: {
      type: String,
      required: true,
    },
    prize_pool: {
      type: String,
      required: true,
      default: "TBD",
    },
    region: {
      type: String,
      required: true,
    },
    event_logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Event = mongoose.model("Event", eventSchema);
