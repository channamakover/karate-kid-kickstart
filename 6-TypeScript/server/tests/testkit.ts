import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../app";
import appDriver from "../drivers/appDriver";
import dbDriver from '../drivers/dbDriver'

const testkit = () => {
  let appServer: { start: any; close: any; };
  let dbUri: string;
  const setup = async () => {
    try {
      const mongoServer = await MongoMemoryServer.create();
      dbUri = mongoServer.getUri();
      appServer = await server(dbUri);
      return { dbUri, mongoServer };
    } catch (err) {
      console.error(err);
    }
  };
  const drivers = () => {
    const baseUrl = "http://localhost:3000";
    const appdriver = appDriver(baseUrl);
    const dbdriver = dbDriver(dbUri);
    return { appdriver,dbdriver };
  };

  const beforeAndAfter = function () {
    let mongoServer: MongoMemoryServer;

    beforeEach(async () => {
      const res = await setup();
      mongoServer = res.mongoServer;
      await mongoose.connect(res.dbUri);
      appServer.start();
    });

    afterEach(async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      mongoServer.stop();
      appServer.close();
    });
  };

  return {
    beforeAndAfter,
    drivers,
  };
};

export default testkit;
