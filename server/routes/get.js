const router = require("express").Router();
const config = require("../db/config");
const { dbConnect } = require("../utils");

// Return ALL technologies/courses data in DB
router.get("/", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const cursorTechs = client.db(config.DB_NAME).collection("technologies");
    const cursorCourses = client.db(config.DB_NAME).collection("courses");

    // Get all technologies and courses documents
    const technologies = await cursorTechs.find().toArray();
    const courses = await cursorCourses.find().toArray();
    const data = { technologies, courses };

    client.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(`ERROR: ${err}`);
  }
});

module.exports = router;
