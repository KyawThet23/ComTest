import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItemDetail } from "./order-Item-detail";

export class OrderedItem {

  items !: OrderItemDetail[] ;
  customer !: Customer;
  order !: Order; 
}
