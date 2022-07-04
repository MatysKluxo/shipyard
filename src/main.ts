import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const harborLocation = config.get<string>("host");
  const pair = config.get<number>("port");

  app.use(helmet());
  app.enableCors(config.get<Record<string, any>>("cors"));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Pirate Shipyard Docs")
    .setDescription("API documentation for shipyard full of pirate fleet")
    .setVersion("1.0.0")
    .setContact("Matys", null, "matus.radev@gmail.com")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("v1/docs", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(pair, harborLocation);
}
bootstrap();
