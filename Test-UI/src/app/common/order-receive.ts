import { Order } from "./order";

export class OrderReceive {

    name !: string;
    id !: number;
    code !: string;
    orderDate !: Date;
    totalPrice !: number;
    totalQty !: number;
    lastDate !: Date;
}
