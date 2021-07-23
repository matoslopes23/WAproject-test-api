import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString } from "class-validator";
import { PaginationValidator } from "modules/common/validators/pagination";


export class ListOrderValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['description', 'value', 'quantity'])
  @ApiProperty({required: false, enum: ['description']})
  public orderBy: string;

}