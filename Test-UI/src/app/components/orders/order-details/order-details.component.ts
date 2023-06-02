import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { NewOrderItems } from 'src/app/common/new-order-items';
import { OrderItem } from 'src/app/common/order-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  
  edit = true;

  data: any[] = [];
  searchMode: boolean = false;

  current: number = 1;
  perpage: number = 4;
  totalIts: number = this.data.length;

  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleDetail();
      this.listCartDetails();
    });
  }

  handleDetail() {
    this.searchMode = this.route.snapshot.paramMap.has('id');

    if (this.searchMode) {
      this.handleDetailsView();
    } else {
      this.data = [];
    }
  }

  handleDetailsView() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderedProduct(id).subscribe((data) => {
      this.data = data;
    });
  }

  listCartDetails() {
    this.cartItem = this.cartService.cartItem;
  }

  addItems() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;

    const qty: number = this.calculateNewqty() + this.computeQty();
    const total: number = this.calculateNewTotal() + this.calculateTotal();

    let orderItem: OrderItem[] = [];

    for(let item of this.cartItem){
      const cartData = new OrderItem(item.quantity,item.id);
      orderItem.push(cartData)
    }

    for(let item of this.data){
      const cartData = new OrderItem(item[4],item[0]);
      orderItem.push(cartData);
    }

    let newItems = new NewOrderItems();
    newItems.totalQty = qty;
    newItems.totalPrice = total;
    newItems.items = orderItem;

    this.orderService.addNewItem(id, newItems).subscribe();

    window.location.reload();
  }

  delete(id: number, total: number) {
    const orderId: number = +this.route.snapshot.paramMap.get('id')!;

    console.log(id, orderId, total);

    this.orderService.deleteOrderItems(orderId, id, total).subscribe();

    window.location.reload();
  }

  remove(item : any){
    this.cartService.remove(item)
  }

  // new qty from cart
  computeQty() {
    const value = this.cartItem.map(row => row.quantity)
    const qty =  value.reduce((sum,current) => sum+current, 0);
    return qty;
  }

  //new total from cart
  calculateTotal() {
    const total = this.cartItem.reduce((acc, row) => {
      if (row.price !== undefined) {
        return acc + (row.quantity * row.price);
      }
      return acc;
    }, 0);
    return total;
  }

  // new total from ordered list
  calculateNewqty(){
    const qty = this.data.map(row => row[4]);
    const total = qty.reduce((sum,row) => sum+row , 0)
    return total;
  }

  //total from ordered list
  calculateNewTotal(){
    const total = this.data.reduce((acc, row) => acc + (row[3]*row[4]), 0)
    return total;
  }

}