import { Module } from "@nestjs/common";
import { ShipModule } from "./v1/ship/ship.module";
import { ConfigModule } from "@nestjs/config";
import generalConfig from "./v1/config/general";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [generalConfig] }),
    ShipModule
  ]
})
export class AppModule {}
