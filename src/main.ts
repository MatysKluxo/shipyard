import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const harborLocation = config.get<string>("host");
  const pair = config.get<number>("port");

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(pair, harborLocation);
}
bootstrap();
