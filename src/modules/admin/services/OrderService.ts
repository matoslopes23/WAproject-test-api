
import { Injectable, NotFoundException } from '@nestjs/common'
import { IOrder } from 'modules/database/interfaces/IOrder';
import { Order } from 'modules/database/models/Order';
import { OrderRepository } from '../repositories/OrderRepository';

@Injectable()
export class OrderService {

  constructor(
    private orderRepository: OrderRepository
  ){}

  public async save(data:IOrder): Promise<Order> {
    if(data.id){
      return this.update(data);
    }

    return this.create(data);
  }

  public async create(data:IOrder):Promise<Order> {
    const order = await this.orderRepository.insert(data);

    return order;
    
  }

  public async  update(data:IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(data.id);

    if(!order){
      throw new NotFoundException('Not-Found');
    }

    return this.orderRepository.update({ ...order, ...data});
  }

  public async remove(orderId:number): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if(!order){
      throw new NotFoundException('Not-Found')
    }

    return this.orderRepository.remove(orderId);
  }

}