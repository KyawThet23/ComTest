import { Component, OnInit , Inject , forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = []
  searchMode : boolean= false;
  categoryMode: boolean = false;

  // new properties for pagination
  currentPage: number = 1;
  itemsPerpage: number = 5;
  totalItems: number = this.products.length;

  previousKeyword: string = "";

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private cartService : CartService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct();
    })
  }

  listProduct() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.categoryMode = this.route.snapshot.paramMap.has('id');

    if(this.searchMode) {
      this.handleSearch();
    } else if(this.categoryMode){
      this.categorySearch();
    } else {
      this.handleProduct();
    }
  }

  categorySearch() {
    const id: string = this.route.snapshot.paramMap.get('id')!; 

    this.previousKeyword = id;

    this.productsService.getByCatId(id)
    .subscribe(data => this.products = data)
  }

  handleProduct() {
    this.productsService.getAllProduct()
      .subscribe(data => this.products = data);
  }

  handleSearch() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.previousKeyword = theKeyword;

    this.productsService.getProductByName(theKeyword)
                  .subscribe(data => this.products = data)

                  console.log(this.products);
  }

  addToCart(product: Product) {
    
    let theCartItem = new CartItem(product.id , product.name, product.price);

    this.cartService.addToCart(theCartItem);
  }

  delete(id: number) {
    console.log(id);
    this.productsService.deleteById(id).subscribe();
  }

  updateItemsPerPage(value:string){
      this.totalItems = +value;
      this.currentPage = 1;
  }

}
