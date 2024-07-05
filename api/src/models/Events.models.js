import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
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
      default: "",
    },
    country_img: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default Event = mongoose.model("Event", eventSchema);
