

export interface IOrder {
  id?:number;
  description: string;
  value:number;
  quantity: number;

  createdDate?: Date;
  updatedDate?: Date;

}