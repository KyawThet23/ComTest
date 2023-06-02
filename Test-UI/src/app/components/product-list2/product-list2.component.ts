import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list2',
  templateUrl: './product-list2.component.html',
  styleUrls: ['./product-list2.component.css'],
})
export class ProductList2Component implements OnInit {

  tempItem : Product[] = [];

  products: Product[] = [];

  currentPage: number = 1;
  itemsPerpage: number = 7;
  totalItems: number = this.products.length;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService
      .getAllProduct()
      .subscribe((data) => (this.products = data));
  }

  checkFunc(item : Product , event : any){
    item.isChecked = event.target.checked;
    if(item.isChecked){

      this.tempItem.push(item);

    }else{

      const index = this.tempItem.findIndex(temp => temp.id === item.id)

      this.tempItem.splice(index,1);

    }
  }

  add() {
    for(let item of this.tempItem){
      item.isChecked = false;
      let cartItem = new CartItem(item.id,item.name,item.price)
      this.cartService.addToCart(cartItem);
    }
    this.tempItem = [];
  }
}
