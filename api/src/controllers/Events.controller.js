import Event from "../models/events.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createEvent = async (req, res, next) => {
  const { event_name, prize_pool, region, status, event_logo, event_date } =
    req.body;
  
  // required to add all the fields 
  if (
    !event_date ||
    !event_logo ||
    !event_name ||
    !region ||
    !status ||
    !prize_pool
  ) {
    return next(errorHandler(400,"Please fill all the fields."));
  }

  try {
    const event = await Event.create({
      event_name,
      prize_pool,
      region,
      status,
      event_logo,
      event_date,
    });
    return res
      .status(200)
      .json(new ApiResponse(201, event, "event created successfully"));
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    return res
      .status(200)
      .json(
        new ApiResponse(201, allEvents, "all events extracted successfully!")
      );
  } catch (error) {
    next(error);
  }
};
