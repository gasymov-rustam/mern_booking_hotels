import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utils/error.js';

const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.SECRET_KEY);

    const { password, isAdmin, ...otherDetails } = newUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(201)
      .json({ success: true, data: otherDetails, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY);

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ success: true, details: otherDetails, isAdmin, token });
  } catch (error) {
    next(error);
  }
};

export const authController = { register, login };
