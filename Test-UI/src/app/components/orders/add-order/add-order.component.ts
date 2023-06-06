import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { Ordered} from 'src/app/common/ordered'
import { Customer } from 'src/app/common/customer';
import { CartItem } from 'src/app/common/cart-item';
import { OrderItem } from 'src/app/common/order-item';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit{
  
  products : Product[] = [] ;
  customerForm !: FormGroup ;

  cartItem : CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0; 

  addCart(item: Product){

    let cartItem = new CartItem(item.id,item.name,item.price)

    this.cartService.addToCart(cartItem);
  }

  constructor(
              private productService : ProductService,
              private cartService : CartService,
              private OrderService : OrderService,
              private fb : FormBuilder,
              private route : Router
              ){
                this.customerForm = fb.group({
                  
                        firstName: new FormControl ('',[Validators.required, Validators.minLength(2)]),

                        lastName: new FormControl ('',[Validators.required, Validators.minLength(2)]),

                        phone: new FormControl ('',[Validators.required, Validators.minLength(9), 
                          Validators.maxLength(11)]),
                        
                        email: new FormControl ('',[Validators.required,
                          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

                        address: new FormControl ('',[Validators.required])  
                })
              }

  ngOnInit(): void {

    this.productService.getAllProduct().subscribe(data => this.products = data);

    this.listCartDetails();

  }

  listCartDetails() {
    
    this.cartItem = this.cartService.cartItem;

  }

  get firstName() { return this.customerForm.get('firstName'); }
  get lastName() { return this.customerForm.get('lastName'); }
  get phone() { return this.customerForm.get('phone'); }
  get email() { return this.customerForm.get('email'); }
  get address() { return this.customerForm.get('address')}

  forTotal(total:number){
    this.totalPrice = total;
  }

  forQty(qty:number){
    this.totalQuantity = qty;
  }

  makeOrder(){

    let customer : Customer = this.customerForm.value;

    const cartItem = this.cartService.cartItem;

    let orderItem : OrderItem[] = cartItem.map( item => 
      new OrderItem(item.quantity,item.id)  
    )

    let ordered = new Ordered()
  
    ordered.customer = customer;
    ordered.orderItems = orderItem;
    ordered.totalPrice = this.totalPrice;
    ordered.totalQty = this.totalQuantity;

    this.OrderService.placeOrder(ordered).subscribe();

    this.route.navigateByUrl(`/order`)
    
    this.resetCart();
  }

  resetCart() {
    
    this.cartService.cartItem = [];
    
  }
}

