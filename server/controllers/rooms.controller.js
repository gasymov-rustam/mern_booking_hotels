import Hotel from '../models/Hotel.js';

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json({ success: true, message: 'Room status has been updated.' });
  } catch (err) {
    next(err);
  }
};
import Room from '../models/Room.js';

const createRoom = async (req, res, next) => {
  try {
    if (!req.params.hotelId) {
      throw new Error();
    }

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    } catch (error) {
      next(error);
    }

    res.status(201).json({ success: true, data: savedRoom });
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedRoom });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    if (!req.params.id || !req.params.hotelId) {
      throw new Error();
    }

    const hotelId = req.params.hotelId;

    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    } catch (error) {
      next(error);
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const room = await Room.findById(req.params.id);

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
};

export const roomController = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getAllRooms,
  updateRoomAvailability,
};
