const router = require("express").Router();
const objectId = require("mongodb").ObjectId;
const config = require("../db/config");
const { dbConnect, sanitizeRequest } = require("../utils");

// ------------------------------------------------------------------------------------ GET
router.get("/", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const collection = client.db(config.DB_NAME).collection("courses");

    // Get all technologies documents
    const data = await collection.find().toArray();

    client.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(`ERROR: ${err}`);
  }
});

// ------------------------------------------------------------------------------------ POST
router.post("/", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const collection = client.db(config.DB_NAME).collection("courses");

    // Sanitize and insert data into DB
    const newCourse = sanitizeRequest(req);
    const result = await collection.insertOne(newCourse);

    client.close();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(`ERROR: ${err}`);
  }
});

// ------------------------------------------------------------------------------------ PUT
router.put("/update/:id", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const cursorCourses = client.db(config.DB_NAME).collection("courses");
    const cursorTechs = client.db(config.DB_NAME).collection("technologies");

    // Get course code by ID
    const { code } = await cursorCourses.findOne({
      _id: objectId(req.params.id)
    });

    // Sanitize request data
    const updatedCourse = sanitizeRequest(req);

    // Update technologies collection with new course data
    await cursorTechs.updateMany(
      { courses: { $elemMatch: { code } } },
      { $set: { "courses.$": updatedCourse } },
      { multi: true }
    );

    // Update document in courses collection with new data
    await cursorCourses.updateOne(
      { _id: objectId(req.params.id) },
      { $set: updatedCourse }
    );

    client.close();
    res.send({ msg: `${code} course updated`, updated: updatedCourse });
  } catch (err) {
    console.log(err);
    res.status(500).send(`ERROR: ${err}`);
  }
});

// ------------------------------------------------------------------------------------ DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const cursorCourses = client.db(config.DB_NAME).collection("courses");
    const cursorTechs = client.db(config.DB_NAME).collection("technologies");

    // Get course code by ID
    const { code } = await cursorCourses.findOne({
      _id: objectId(req.params.id)
    });

    // Remove course from technologies that list it
    await cursorTechs.updateMany(
      {},
      { $pull: { courses: { code } } },
      { multi: true }
    );

    // Delete course from courses collection
    await cursorCourses.deleteOne({ _id: objectId(req.params.id) });

    client.close();
    res.send({ msg: `${code} course deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send(`ERROR: ${err}`);
  }
});

module.exports = router;
