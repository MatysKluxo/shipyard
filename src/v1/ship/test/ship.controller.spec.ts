import { Test, TestingModule } from "@nestjs/testing";
import { ShipController } from "../ship.controller";
import { AddShipDto } from "../dto";
import { ShipEntity } from "../entity";
import { ShipService } from "../ship.service";

describe("ShipController", () => {
  let controller: ShipController;

  const mockedShipsList: ShipEntity[] = [
    { id: 1, name: "Ship 1", speed: "10" },
    { id: 2, name: "Ship 2", speed: "20" }
  ];

  const mockedShipService = {
    addShip: jest.fn(async (data: AddShipDto): Promise<ShipEntity> => {
      return {
        id: mockedShipsList.length + 1,
        name: data.name,
        speed: data.speed
      };
    }),
    getShips: jest.fn(async (): Promise<ShipEntity[]> => {
      return mockedShipsList;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipController],
      providers: [{ provide: ShipService, useValue: mockedShipService }]
    }).compile();

    controller = module.get<ShipController>(ShipController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should add new ship to the fleet", async () => {
    const requestBody: AddShipDto = { name: "Cleopatra", speed: "40" };

    const response = await controller.addShip(requestBody);

    expect(mockedShipService.addShip).toHaveBeenCalledTimes(1);
    expect(mockedShipService.addShip).toBeCalledWith(requestBody);
    expect(response).toEqual({
      id: mockedShipsList.length + 1,
      name: requestBody.name,
      speed: requestBody.speed
    });
  });

  it("should return list of all ships", async () => {
    const response = await controller.getShips();

    expect(mockedShipService.getShips).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockedShipsList);
  });
});
