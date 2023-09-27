const router = require("express").Router();

const cors = require("cors");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
