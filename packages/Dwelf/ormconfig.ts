export default {
  name: "default",
  type: "mongodb",
  url: process.env.MONGO_URL,
  useUnifiedTopology: true,
  entities: ["./src/modules/**/infra/entities/*.ts"],
};
