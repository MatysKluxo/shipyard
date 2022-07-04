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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Ship")
@Controller("v1")
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Post("ships")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Add ship to shipyard",
    description: "Ship object to be added to shipyard"
  })
  @ApiResponse({ status: 201, type: ShipEntity, description: "Success" })
  @ApiResponse({
    status: 400,
    description: "Provided ship parameters are invalid"
  })
  async addShip(@Body() data: AddShipDto): Promise<ShipEntity> {
    return await this.shipService.addShip(data);
  }

  @Get("ships")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Fetches list of Ships" })
  @ApiResponse({
    status: 200,
    type: [ShipEntity],
    description: "Successful operation"
  })
  async getShips(): Promise<ShipEntity[]> {
    return await this.shipService.getShips();
  }
}
