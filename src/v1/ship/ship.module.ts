import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';

@Module({
  providers: [ShipService],
  controllers: [ShipController]
})
export class ShipModule {}
