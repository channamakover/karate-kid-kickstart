const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();

const dbConnect = async function () {
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
};

const dbDisconnect = async function () {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports = {
  dbConnect,
  dbDisconnect,
};
