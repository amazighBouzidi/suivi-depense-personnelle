import { Router } from "express";

import * as userController from "../controllers/userController.js"
import * as authControls from "../middleware/auth.js"

const router = Router();

/**POST METHOD */
router.route('/auth/userForm').post(userController.registerUserWithForm)
router.route('/auth/authUser').post(userController.authUser)
router.route('/checkUser').post(authControls.checkUser)

/**GET METHOD */


/**PUT METHOD */


/**DELETE METHOD */



export default router;