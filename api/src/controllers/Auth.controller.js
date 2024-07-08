import { User } from "../models/Users.models.js";
import { errorHandler } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return next(errorHandler(409, "All fields are required."));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const existedUser = await User.findOne({
    $or: [{ username, email }],
  });

  if (existedUser) {
    return next(errorHandler(409, "User already exists."));
  }

  const avatarLocalPath = req.file?.path;
  console.log(req?.file);

  if (!avatarLocalPath) {
    return next(errorHandler(400, "Avatar file is required"));
  }

  // upload them to cloudinary - as the file may take time to upload so use async
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if(!avatar){
    return next(errorHandler(401,"Avatar is required!"));
  }

  const newUser = new User({
    username: username.toLowerCase(),
    avatar: avatar.url,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken" // write those field which we dont want to send
    );
    return res.json(
      new ApiResponse(200, createdUser, "User is signed up successfully!")
    );
  } catch (error) {
    next(error);
  }
};

// const options = {
//     httpOnly: true,
//     secure: true,
//   };
