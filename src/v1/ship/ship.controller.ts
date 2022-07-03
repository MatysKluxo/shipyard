import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import { ShipService } from "./ship.service";
import { AddShipDto } from "./dto";
import { ShipEntity } from "./entity";

@Controller("v1")
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Post("ships")
  @HttpCode(HttpStatus.CREATED)
  async addShip(@Body() data: AddShipDto): Promise<ShipEntity> {
    return await this.shipService.addShip(data);
  }

  @Get("ships")
  @HttpCode(HttpStatus.OK)
  async getShips(): Promise<ShipEntity[]> {
    return await this.shipService.getShips();
  }
}
