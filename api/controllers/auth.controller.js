import bcryptjs from "bcryptjs";
import User from "../modals/user.modal.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
// encrypting the password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // using the user modal to create the user 
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // finding user by email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    // assign token for verification in future operations
    const token = jwt.sign({ id: validUser._id }, "anuragyadav");
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // cleaning cookies save in browser session
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};
