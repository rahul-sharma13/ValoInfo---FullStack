import { User } from "../models/Users.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

// update user
export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(errorHandler(403, "You can only update your account!"));

  // console.log(req.body);

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const userToUpdate = await User.findOneAndUpdate(
      req.body.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true, runValidators: true } // new: true will return the updated document and runValidators will run the validators
    );

    // console.log(userToUpdate);

    const updatedUser = await User.findById(userToUpdate._id).select(
      "-password"
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Profile has been updated."));
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (req,res,next) => {
    if (req.params.id !== req.user.id)
        return next(errorHandler(403, "You can only delete your account!"));
    
    try {
        await User.findOneAndDelete(req.user.id);
        res.clearCookie("access_token");
        res.status(200).json(new ApiResponse(200, {}, "Profile has been deleted."));
    } catch (error) {
        next(error);
    }
}

// get user
