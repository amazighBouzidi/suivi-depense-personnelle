import { Router } from "express";
import { Auth } from "../middleware/auth.js";

import * as userController from "../controllers/userController.js"
import * as authControls from "../middleware/auth.js"

const router = Router();

/**POST METHOD */
router.route('/auth/userForm').post(userController.registerUserWithForm)
router.route('/auth/authUser').post(userController.authUser)
router.route('/checkUser').post(authControls.checkUser)

/**GET METHOD */
router.route('/getUser').get(Auth, userController.getUser)

/**PUT METHOD */
router.route('/updateProfile').put(Auth, userController.updateUser); // is use to update the user profile

/**DELETE METHOD */



export default router;