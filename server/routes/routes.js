import { Router } from "express";
import { Auth } from "../middleware/auth.js";

import * as userController from "../controllers/userController.js"
import * as authControls from "../middleware/auth.js"
import * as expenseController from "../controllers/depenseController.js"

const router = Router();

/**POST METHOD */
router.route('/auth/userForm').post(userController.registerUserWithForm)
router.route('/auth/authUser').post(userController.authUser)
router.route('/checkUser').post(authControls.checkUser)
router.route('/AddExpense').post(Auth, expenseController.AddExpense)

/**GET METHOD */
router.route('/getUser').get(Auth, userController.getUser)
router.route('/getAllExpenses').get(Auth, expenseController.getAllExepenses)

/**PUT METHOD */
router.route('/updateProfile').put(Auth, userController.updateUser); // is use to update the user profile
router.route('/UpdateExpense').put(Auth, expenseController.UpdateExpense);

/**DELETE METHOD */
router.route('/deleteExpense/:expenseId').delete(Auth, expenseController.deleteExpense);


export default router;