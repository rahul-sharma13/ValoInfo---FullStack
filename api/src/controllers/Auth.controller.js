import { User } from "../models/Users.models.js";
import { errorHandler } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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

  const newUser = new User({
    username: username.toLowerCase(),
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const createdUser = await User.findById(newUser._id).select(
      "-password" // write those field which we dont want to send
    );
    return res.json(
      new ApiResponse(200, createdUser, "User is signed up successfully!")
    );
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(errorHandler(400, "All fields are required."));

  try {
    const validUser = await User.findOne({ email });

    if (!validUser)
      return next(errorHandler(404, "User not found, please sign up first"));

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.ACCESS_TOKEN_SECRET
    );
    // console.log("token is ", token);

    const requiredUser = await User.findById(validUser._id).select("-password");

    return res
      .cookie("access_token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(new ApiResponse(200, requiredUser, "User signed in successfully."));
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json(new ApiResponse(200, {}, "user has been signed out."));
  } catch (error) {
    next(error);
  }
};

export const googleSignIn = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const { password, ...rest } = user._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(new ApiResponse(200, rest, "User signed in successfully."));
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(new ApiResponse(200, rest, "User signed in successfully."));
    }
  } catch (error) {
    next(error);
  }
};
