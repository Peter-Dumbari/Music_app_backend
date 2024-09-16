import { Router } from "express";

const router = Router();

router.get("/api/v1/products", (req, res) => {
  console.log(req.headers.cookie);
  res.status(201).send([
    { id: 0, name: "product 1" },
    { id: 1, name: "product 2" },
    { id: 2, name: "product 3" },
  ]);
});

export default router;
