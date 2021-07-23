import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/IOrder';


export class Order extends Model implements IOrder {
  
  @ApiProperty({type:'integer'})
  public id?: number;
  
  @ApiProperty({type:'string'})
  public description: string;
  
  @ApiProperty({type:'integer'})
  value: number;

  @ApiProperty({type:'integer'})
  public quantity: number;

  @ApiProperty({type:'string', format:'date-time'})
  public createdDate: Date;

  @ApiProperty({type:'date-time', format:'date-time'})
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Order';
  }
  
  public $beforeInsert():void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
