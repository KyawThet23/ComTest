import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit{
  
  @Output() totalCalculated: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalQty: EventEmitter<number> = new EventEmitter<number>();

  cartItem : CartItem[] = [];

  qty : number = 1;
  total  !: number;

  constructor(private cartService : CartService , private route:Router){}

  ngOnInit(): void {
    this.listCartDetails();
  }

  computeQty() {
    const value = this.cartItem.map(row => row.quantity)
    const qty =  value.reduce((sum,current) => sum+current, 0);
    this.totalQty.emit(qty);
    return qty;
  }

  calculateTotal() {
    const total = this.cartItem.reduce((acc, row) => {
      if (row.price !== undefined) {
        return acc + (row.quantity * row.price);
      }
      return acc;
    }, 0);
    this.totalCalculated.emit(total)
    return total;
  }

  listCartDetails() {
    
    this.cartItem = this.cartService.cartItem;

  }

  remove(item : CartItem){
    this.cartService.remove(item)
  }

  

}
