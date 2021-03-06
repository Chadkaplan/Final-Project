const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const quizRoutes = require("./quiz")

//User Routes
router.use("/users", userRoutes);

//Quiz Routes
router.use("/quiz", quizRoutes)

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
