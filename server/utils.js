const MongoClient = require("mongodb").MongoClient;

//--- Connects to the MongoDB driver
const dbConnect = async url => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  return client;
};

//--- Sanitizes un-nested string properties of an object
const sanitizeRequest = req => {
  const sanitized = {};
  for (let prop in req.body) {
    if (typeof req.body[prop] == "string") {
      sanitized[prop] = req.sanitize(req.body[prop]);
    } else {
      sanitized[prop] = req.body[prop];
    }
  }
  return sanitized;
};

module.exports = { dbConnect, sanitizeRequest };
