import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server'
const mongoServer = new MongoMemoryServer();
const beforeAndAfter =function(): Object {

  const beforAll = async function () :Promise<string>{
    const uri = await mongoServer.getUri();
    await mongoose.connect(uri);
    return uri;
  };

  const afterAll = async function () {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  };
return {beforAll,afterAll}

}
export default beforeAndAfter;


