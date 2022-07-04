import { Test, TestingModule } from "@nestjs/testing";
import { ShipService } from "../ship.service";
import { ConfigService } from "@nestjs/config";
import { ShipEntity } from "../entity";

describe("ShipService", () => {
  let service: ShipService;

  const mockedShipsList = [
    { id: 1, name: "Ship 1", speed: "10" },
    { id: 2, name: "Ship 2", speed: "20" }
  ];

  const mockedShip = { name: "Cleopatra", speed: "40" };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipService, ConfigService]
    }).compile();

    service = module.get<ShipService>(ShipService);

    service["getShipsFromStorage"] = jest.fn(
      async (): Promise<ShipEntity[]> => {
        return mockedShipsList;
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should add new ship to the fleet", async () => {
    service["addShipToStorage"] = jest.fn(
      async (list: ShipEntity[], data: ShipEntity): Promise<void> => {
        list.push(data);
      }
    );

    const createdShip = { id: mockedShipsList.length + 1, ...mockedShip };

    const response = await service.addShip(createdShip);

    expect(service["getShipsFromStorage"]).toHaveBeenCalledTimes(1);
    expect(service["addShipToStorage"]).toBeCalledWith(
      mockedShipsList,
      createdShip
    );
    expect(service["addShipToStorage"]).toHaveBeenCalledTimes(1);

    expect(response).toEqual(createdShip);
  });

  it("should return all ships in the fleet", async () => {
    const response = await service.getShips();

    expect(service["getShipsFromStorage"]).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockedShipsList);
  });
});
