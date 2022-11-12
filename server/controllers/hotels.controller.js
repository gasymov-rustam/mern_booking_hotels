import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();

    res.status(201).json({ success: true, data: savedHotel });
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedHotel });
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const { min = 1, max = 10000, city = '', ...others } = req.query;
    const cityRegEx = new RegExp(city, 'i');

    const hotels = await Hotel.find({
      city: { $regex: cityRegEx },
      cheapestPrice: { $gt: min, $lt: max },
      ...others,
    }).limit(req.query.limit);

    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(',');
    // const list = await Promise.all(cities.map((city) => Hotel.findOne({ city })).length);
    const list = await Promise.all(cities.map((city) => Hotel.countDocuments({ city })));

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json({
      success: true,
      data: [
        { type: 'hotel', count: hotelCount },
        { type: 'apartments', count: apartmentCount },
        { type: 'resorts', count: resortCount },
        { type: 'villas', count: villaCount },
        { type: 'cabins', count: cabinCount },
      ],
    });
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

export const hotelController = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
};
