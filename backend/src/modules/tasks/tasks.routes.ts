import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { create, list, remove, update } from "./tasks.controller";

const router = Router();

router.use(requireAuth);

router.get("/", list);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
