let router = require("express").Router();
const errHandler = (err) => {
  console.log("\n\n  *****  Error  **** :: " + err);
};

router.post("/login", (req, res) => {
  res.status(200).json({ data: "hello" });
});
router.post("/register", (req, res) => {
  res.status(200).json({ data: "hello register" });
});
router.get("/currentUser", (req, res) => {
  res.status(200).json({ data: "hello current user" });
});
router.post("/logout", async (req, res) => {
  res.status(200).json({ data: "hello logout" });
});

module.exports = router;
