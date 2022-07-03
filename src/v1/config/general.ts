export default () => ({
  port: +process.env.HARBOR_PAIR || 4200,
  host: process.env.HARBOR_LOCATION || "localhost",
  shipsStoragePath: "src/v1/data/ships.json"
});
