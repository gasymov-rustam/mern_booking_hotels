import { Router } from 'express';
import { userController } from '../controllers/users.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = new Router();

router.get('/', verifyUser, userController.getAllUsers);
router.get('/:id', verifyUser, userController.getUserById);
router.put('/:id', verifyUser, userController.updateUser);
router.delete('/:id', verifyAdmin, userController.deleteUser);

export default router;

/** examples */
// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })
