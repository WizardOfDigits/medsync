import { Router } from "express";
import {
  loginHandler,
  signupHandler,
  updatePasswordHandler,
  deleteUserHandler,
} from "../../controllers/user/userAuth.js";

const router = Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/update-password", updatePasswordHandler);
router.post("/delete", deleteUserHandler);

export default router;
