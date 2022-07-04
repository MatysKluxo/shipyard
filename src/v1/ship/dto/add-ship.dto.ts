import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddShipDto {
  @ApiProperty({
    maxLength: 50,
    minLength: 3,
    type: String,
    description: "Name of the ship",
    example: "Ghost of Black Widow",
    required: true
  })
  @IsString({
    message: "Ship name must be a string..."
  })
  @MaxLength(50, {
    message:
      "You are in 16th century, it was probably impossible for drunk pirate to create more than 50 characters name for the ship"
  })
  @MinLength(3, {
    message:
      "Please, be more creative. Maybe if you drink little bit less of rum, you could probably create more than 3-characters name"
  })
  name: string;

  @ApiProperty({
    maxLength: 10,
    type: String,
    description: "Speed of the ship",
    example: "64",
    required: true
  })
  @IsString({
    message: "Set speed as a string"
  })
  @MaxLength(10, {
    message: "Max 10 characters, it can't be faster"
  })
  @MinLength(1, {
    message:
      "Min 1 character, it can't be slower. Nobody want to have a ship which is unable to sail"
  })
  speed: string;
}
