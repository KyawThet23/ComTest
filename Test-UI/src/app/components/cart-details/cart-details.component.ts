import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { OrderItem } from 'src/app/common/order-item';
import { OrderResponse } from 'src/app/common/order-response';
import { Ordered } from 'src/app/common/ordered';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit{
  
  cartItem : CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService : CartService , private route:Router){}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    
    this.cartItem = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeTotal();

  }

  addCart(item: CartItem){
    this.cartService.addToCart(item);
  }

  decrease(item: CartItem){
    this.cartService.decrementQuantity(item);
  }

  makeOrder() {

    let order = new OrderResponse(this.totalPrice,this.totalQuantity);

    const cartItem = this.cartService.cartItem;

    let orderItem : OrderItem[] = cartItem.map( item => 
      new OrderItem(item.quantity,item.id)  
    )

    let ordered = new Ordered();

    ordered.order = order;
    ordered.orderItems = orderItem;
    

    console.log(ordered)

    this.cartService.placeOrder(ordered)  .subscribe()

    this.resetCart();
  }

  remove(item : CartItem){
    this.cartService.remove(item)
  }

  resetCart() {
    
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.route.navigateByUrl(`/dashboard/order`)
    
  }

}
