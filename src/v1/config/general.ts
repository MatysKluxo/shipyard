export default () => ({
  port: +process.env.HARBOR_PAIR || 4200,
  host: process.env.HARBOR_LOCATION || "localhost",
  shipsStoragePath: "src/v1/data/ships.json",
  cors: {
    origin: [`${process.env.HARBOR_LOCATION}:${process.env.HARBOR_PAIR}`]
  },
  rateLimit: {
    ttl: 30,
    limit: 20
  }
});
