import { ApiProperty } from "@nestjs/swagger";

export class ShipEntity {
  @ApiProperty({
    type: Number,
    description: "ID of the ship",
    example: 1
  })
  id: number;

  @ApiProperty({
    type: String,
    description: "Name of the ship",
    example: "Shadow of the Lost Sailor"
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "Speed of the ship",
    example: "31"
  })
  speed: string;
}
