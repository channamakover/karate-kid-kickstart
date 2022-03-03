import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../app";
import appDriver from "../drivers/appDriver";

const testkit = () => {
  const setup = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const fakeApp = server(uri).start();
    return { uri, mongoServer, fakeApp };
  };
  const drivers = async () => {
    const { uri } = await setup();
    const _appDriver = appDriver(uri);
    return { _appDriver };
  };

  const beforeAndAfter = function () {
    beforeEach(async () => {
      const { uri } = await setup();
      mongoose.connect(uri);
    });

    afterEach(async () => {
      const { mongoServer } = await setup();
      mongoose.connection.dropDatabase();
      mongoose.connection.close();
      mongoServer.stop();
    });
  };

  return {
    beforeAndAfter,
    drivers,
  };
};

export default testkit;
