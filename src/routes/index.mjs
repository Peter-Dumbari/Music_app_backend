import { Router } from "express";
import userRoute from "./user.mjs";
import productRoute from "./product.mjs";

const router = Router();

router.use(userRoute);
router.use(productRoute);

export default router;
