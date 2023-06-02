import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  categories !: Category[];
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private category: CategoryService,
    private route: Router
  ){
    this.productForm = this.fb.group({
      brand: ['',Validators.required],
      name: ['', Validators.required],
      price: ['',Validators.required],
      quantity: ['',Validators.required],
      catId: [Number, Validators.required]
    });
  }

  ngOnInit(): void {
    this.category.getAllCategory().subscribe(
      data => this.categories = data
    )
  }

  onSubmit(){
    const product = this.productForm.value;
    console.log(product);
    this.service.createProduct(product).subscribe();
    this.route.navigateByUrl('/product')
  }

}
