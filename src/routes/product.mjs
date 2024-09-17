import { Router } from "express";

const router = Router();

router.get("/api/v1/products", (req, res) => {
  console.log("cookies", req.cookies);
  if (req.cookies.hello && req.cookies.hello === "world") {
    return res.status(201).send([
      { id: 0, name: "product 1" },
      { id: 1, name: "product 2" },
      { id: 2, name: "product 3" },
    ]);
  } else
    return res.status(403).send("you need to have correct cookie to see this");
});

export default router;
