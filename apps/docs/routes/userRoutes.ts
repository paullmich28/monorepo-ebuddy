import express from "express"
import { updateUser, getUsers } from "../controller/api";
import { authenticateToken } from "../middleware/authMiddleware";

export const router = express.Router()

router.patch("/update-user-data", authenticateToken, async (req, res) => {
  await updateUser(req.body, res)
});

router.get("/fetch-user-data", authenticateToken, async (_, res) => {
  await getUsers(res)
});
