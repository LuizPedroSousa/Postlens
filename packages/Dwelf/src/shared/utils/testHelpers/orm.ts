import { createConnections, getConnection } from "typeorm";

interface IConnection {
  create(): Promise<void>;
  close(): Promise<void>;
  clean(): Promise<void>;
}

const connection: IConnection = {
  async create() {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server is not initialized");
    }
    await createConnections();
  },
  async close() {
    await getConnection().close();
  },
  async clean() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      repository.delete({});
    });
  },
};

export { connection };
