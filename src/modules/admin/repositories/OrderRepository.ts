
import { Injectable } from "@nestjs/common";
import { IPaginationParams } from "modules/common/interfaces/pagination";
import { IOrder } from "modules/database/interfaces/IOrder";
import { Order } from "modules/database/models/Order";
import { Page, Transaction } from "objection";


@Injectable()
export class OrderRepository {
  
  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction).select('*').page(params.page, params.pageSize);

    if(params.orderBy){
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if(params.term) {
      if(!isNaN(Number(params.term))) {
        query = query.where('id', Number(params.term));
      }else {
        query = query.where('description', 'ilike', `%${params.term}%`)
      }
    }

    return query;
  }
  public async findById(id:number, transaction?: Transaction): Promise<Order> {
    const order = await Order.query(transaction).where({ id }).first();

    return order;
  }
  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id,<Order>model );
  }

  public async remove(id:number, transaction?: Transaction):Promise<void> {
    await Order.query(transaction).del().where({id});
  }
}