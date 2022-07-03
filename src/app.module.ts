import { Module } from "@nestjs/common";
import { ShipModule } from "./v1/ship/ship.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import generalConfig from "./v1/config/general";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [generalConfig] }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>("rateLimit.ttl"),
        limit: config.get<number>("rateLimit.limit")
      })
    }),
    ShipModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
