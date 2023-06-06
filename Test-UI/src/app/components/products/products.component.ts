import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput !: ElementRef<HTMLInputElement>;

  id !: number;
  category : Category[] = [];
  
  constructor(private router : Router, 
              private productService: ProductService , 
              private categoryService: CategoryService) 
              {}

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => this.category = data);
  }

  downloadExcel(){
      this.productService.getExcelFile();
  }
  
  doSearch(value : string) {
      this.router.navigateByUrl(`/product/search/${value}`);
  }

  onSelect(){
    this.router.navigateByUrl(`/product/category/${this.id}`);
  }

  importFile() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event : any){
    const file = event.target.files[0];
    const form = new FormData();

    form.append('file',file);

    this.productService.importExcelFile(form).subscribe();

    window.location.reload();
  }
}
