import User from '../models/Hotel.js';

const updateUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
