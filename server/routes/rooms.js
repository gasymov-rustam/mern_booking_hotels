import { Router } from 'express';
import { roomController } from '../controllers/rooms.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = new Router();

router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.post('/:hotelId', verifyAdmin, roomController.createRoom);
router.put('/:id', verifyAdmin, roomController.updateRoom);
router.put('/availability/:id', roomController.updateRoomAvailability);
router.delete('/:id/:hotelId', verifyAdmin, roomController.deleteRoom);

export default router;
