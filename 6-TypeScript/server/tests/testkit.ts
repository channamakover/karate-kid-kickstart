import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from 'server.ts'

const testkit =  () => {
  const setup = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const fakeApp = app(dburl).start();
    return {uri,mongoServer};
  };
  const drivers = ()=>{
    appDriver = appDriver
    return {appDriver,dbDriver}
  }


  const beforeAndAfter = function () {
    beforeEach(async () => {
      const {uri} = await setup();
      mongoose.connect(uri);
    });

    afterEach(async() => {
      const {mongoServer} = await setup();
      mongoose.connection.dropDatabase();
      mongoose.connection.close();
      mongoServer.stop();
    });
  };


  return {
    beforeAndAfter,
  };
};

export default testkit;
