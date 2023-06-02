import { Customer } from "./customer";

export class Order {

    id !: number;
    code !: number;
    orderDate !: Date;
    totalPrice !: number;
    totalQty !: number;
    lastDate !: Date;
}
