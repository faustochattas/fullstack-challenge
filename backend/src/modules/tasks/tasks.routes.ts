import { Router } from "express";
import { asyncHandler } from "../../utils/async";
import { requireAuth } from "../../middleware/auth";
import { create, list, remove, update } from "./tasks.controller";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(list));
router.post("/", asyncHandler(create));
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
