const router = require("express").Router();
const objectId = require("mongodb").ObjectId;
const config = require("../db/config");
const { dbConnect, sanitizeRequest } = require("../utils");

// ------------------------------------------------------------------------------------ GET
router.get("/", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const collection = client.db(config.DB_NAME).collection("technologies");

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
    const collection = client.db(config.DB_NAME).collection("technologies");

    // Sanitize and insert data into DB
    const newTech = sanitizeRequest(req);
    const result = await collection.insertOne(newTech);

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
    const collection = client.db(config.DB_NAME).collection("technologies");

    // Sanitize and update document in DB
    const updatedTech = sanitizeRequest(req);
    await collection.updateOne(
      { _id: objectId(req.params.id) },
      { $set: updatedTech }
    );

    client.close();
    res.send({ msg: `Technology ID: ${req.params.id} updated` });
  } catch (err) {
    console.log(err);
    res.status(500).send(`ERROR: ${err}`);
  }
});

// ------------------------------------------------------------------------------------ DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const client = await dbConnect(config.DB_URL);
    const collection = client.db(config.DB_NAME).collection("technologies");

    // Delete document with matching ID
    await collection.deleteOne({ _id: objectId(req.params.id) });
    client.close();

    res.send({ msg: `Technology ID: ${req.params.id} deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send(`ERROR: ${err}`);
  }
});

module.exports = router;
