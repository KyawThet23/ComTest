import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export class Ordered {

  customer !: Customer;
  orderItems !: OrderItem[];
  totalPrice !: number;
  totalQty !: number

}
