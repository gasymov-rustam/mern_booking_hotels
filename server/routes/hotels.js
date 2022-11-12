import { Router } from 'express';
import { hotelController } from '../controllers/hotels.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = new Router();

router.get('/', hotelController.getAllHotels);
router.get('/find/:id', hotelController.getHotelById);
router.get('/countByCity', hotelController.countByCity);
router.get('/countByType', hotelController.countByType);
router.post('/', verifyAdmin, hotelController.createHotel);
router.put('/:id', verifyAdmin, hotelController.updateHotel);
router.delete('/:id', verifyAdmin, hotelController.deleteHotel);
router.get('/room/:id', hotelController.getHotelRooms);

export default router;
