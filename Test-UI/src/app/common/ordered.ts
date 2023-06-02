import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { OrderResponse } from "./order-response";

export class Ordered {

  customer !: Customer;
  orderItems !: OrderItem[];
  order !: OrderResponse;

}
