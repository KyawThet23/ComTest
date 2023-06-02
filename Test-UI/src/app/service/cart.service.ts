import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Ordered } from '../common/ordered';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem : CartItem [] = [];

  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  addToCart(inputItem : CartItem) {

    let alreadyExist : boolean = false;

    let existingCartItem : CartItem = new CartItem();

    if(this.cartItem.length > 0) {
      
      existingCartItem = this.cartItem.find( tenpCartItem => tenpCartItem.id === inputItem.id)!;

      alreadyExist = (existingCartItem != undefined);
    }

    if(alreadyExist) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(inputItem);
    }

    this.computeTotal();
  }
  computeTotal() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentItem of this.cartItem){
      totalPriceValue += currentItem.quantity * currentItem.price!;
      totalQuantityValue += currentItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(item: CartItem){

    item.quantity--;

    if(item.quantity == 0){
      this.remove(item);
    } else {
      this.computeTotal();
    }
  }
  
  remove(item: CartItem) {
    
    const index = this.cartItem.findIndex( temp => temp.id === item.id);

    if (index > -1) {
      this.cartItem.splice(index, 1);

      this.computeTotal();
    }
  }

}
