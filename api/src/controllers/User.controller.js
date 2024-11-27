import mongoose from "mongoose";
import { User } from "../models/Users.models.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.params.id !== req.user.id)
    return next(errorHandler(403, "You can only delete your account!"));

  try {
    await User.findOneAndDelete(req.user.id);
    res.clearCookie("access_token");
    res.status(200).json(new ApiResponse(200, {}, "Profile has been deleted."));
  } catch (error) {
    next(error);
  }
};

// get user
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to access this route!")
    );
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select("-password");

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // to return the users created at time greater than oneMonthAgo
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json(
      new ApiResponse(200, {
        users,
        totalUsers,
        lastMonthUsers,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  // console.log(req.params);

  try {
    const userToShow = await User.findById({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!userToShow) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password, _id, updatedAt, ...user } = userToShow._doc;

    res.status(200).json(new ApiResponse(200, user, "User details"));
  } catch (error) {
    console.log(error);
  }
};

// get user by username
export const getUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  try {
    const userToShow = await User.findOne({ username });
    const { password, updatedAt, ...user } = userToShow._doc;

    res.status(200).json(new ApiResponse(200, user, "User details"));
  } catch (error) {
    next(error);
  }
};

// add user as admin
export const adminManage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(404, "not authorised for this action"));
  }
  const operation = req.query.operation;
  const username = req.params.username;

  try {
    // based on the query(operation) we will add or remove admin
    const userToManage = await User.findOne({ username });

    if (!userToManage) {
      next(errorHandler(401, "user not found!"));
    }

    if (operation === "add") {
      userToManage.isAdmin = true;
    } else if (operation === "remove") {
      userToManage.isAdmin = false;
    } else {
      next(errorHandler(401, "Wrong operation!"));
    }

    const user = await userToManage.save();

    res.json(new ApiResponse(200, user, `${operation} was successful!`));
  } catch (error) {
    next(error);
  }
};
