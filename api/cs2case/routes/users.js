import { Router } from "express";
const router = Router();
import { getMultiple, create } from "../services/users";

router.get("/", async function (req, res, next) {
  try {
    res.json(await getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error geting products `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

export default router;
