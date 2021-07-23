
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { IOrder } from "modules/database/interfaces/IOrder";



export class SaveOrderValidator implements IOrder {
  
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type:'integer'})
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 200})
  public description: string;
  
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({required: true, type: 'double'})
  public value: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty({ required:true, type:'integer'})
  public quantity: number;

}