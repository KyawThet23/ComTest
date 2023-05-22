import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('inputGroupFile', { static: false}) fileInputRef !: ElementRef<HTMLInputElement>;

  id !: number;
  category : Category[] = [];

  constructor(private router : Router, 
              private productService: ProductService , 
              private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => this.category = data);
  }

  downloadExcel(){
      this.productService.getExcelFile();
  }
  
  doSearch(value : string) {
      this.router.navigateByUrl(`dashboard/product/search/${value}`);
  }

  onSelect(){
    this.router.navigateByUrl(`dashboard/product/category/${this.id}`);
  }

  onFileChange(event : any){

    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file',file)

    this.productService.importExcelFile(formData).subscribe(
      response => {
        console.log('File Upload successfully')
      },
      error => {
        console.error('Error uploading file:', error);
      }
    )
  }
  onUpload(){
    this.fileInputRef.nativeElement.click();
  }

  add() {
    this.router.navigateByUrl('dashboard/product/add')
  }
}
