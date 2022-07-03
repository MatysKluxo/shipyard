import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AddShipDto } from "./dto";
import { ShipEntity } from "./entity";
import * as fs from "fs/promises";

@Injectable()
export class ShipService {
  private readonly shipsStoragePath: string;

  constructor(private readonly configService: ConfigService) {
    this.shipsStoragePath = this.configService.get<string>("shipsStoragePath");
  }

  async addShip(data: AddShipDto): Promise<ShipEntity> {
    const shipsList = await this.getShipsFromStorage();

    const newShip: ShipEntity = {
      id: shipsList.length + 1,
      name: data.name,
      speed: data.speed
    };

    await this.addShipToStorage(shipsList, newShip);

    return newShip;
  }

  async getShips(): Promise<ShipEntity[]> {
    return await this.getShipsFromStorage();
  }

  async getShipsFromStorage(): Promise<ShipEntity[]> {
    const shipsList = await fs.readFile(this.shipsStoragePath, "utf8");

    return JSON.parse(shipsList);
  }

  async addShipToStorage(
    shipsList: ShipEntity[],
    addedShip: ShipEntity
  ): Promise<void> {
    shipsList.push(addedShip);

    await fs.writeFile(
      this.shipsStoragePath,
      JSON.stringify(shipsList, null, 2),
      "utf8"
    );
  }
}
