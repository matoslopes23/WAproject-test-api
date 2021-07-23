import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequired } from "modules/common/guards/token";
import { enRoles } from "modules/database/interfaces/IUser";
import { Order } from "modules/database/models/Order";
import { OrderRepository } from "../repositories/OrderRepository";
import { OrderService } from "../services/OrderService";
import { ListOrderValidator } from "../validators/order/list";
import { SaveOrderValidator } from "../validators/order/save";
import { 
  Body, 
  Controller, 
  Delete, Get, 
  Param, ParseIntPipe, 
  Post, 
  Query 
} from "@nestjs/common";

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(
    private orderRepository: OrderRepository,
    private orderService: OrderService
  ){}

  @Post()
  @ApiResponse({status:200, type:Order})
  public async save(@Body() data:SaveOrderValidator){
    return this.orderService.save(data);
  }

  @Get()
  @ApiResponse({status:200, type: [Order]})
  public async list(@Query() query:ListOrderValidator){
    return this.orderRepository.list(query);
  }

  @Get(':orderId')
  @ApiResponse({status:200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId:number){
    return this.orderRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number){
    return this.orderService.remove(orderId);
  }
}