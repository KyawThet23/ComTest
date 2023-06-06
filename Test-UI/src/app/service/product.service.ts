import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }

  getAllProduct() : Observable<Product[]>{
    const getAllUrl = `${this.baseUrl}/all`;

    return this.http.get<Product[]>(getAllUrl);
  }

  getProductByName(name:string
    ) : Observable<Product[]> {

      // 
    const getByName = `${this.baseUrl}/name/${name}`

    return this.http.get<Product[]>(getByName);
  }

  getByCatId(id:string) :Observable<Product[]>
  {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Product[]>(url);
  }

  getExcelFile() : void {

    const getExcel = `${this.baseUrl}/excel`;

    this.http.get(getExcel, {responseType: 'blob'})
    .subscribe(data => {
      saveAs(data , 'products.xlxs');
    });
  
  }

  importExcelFile(data:FormData): Observable<any> {

    const base = `${this.baseUrl}/data`;;

    return this.http.post(base,data);
  };

  deleteById(id:number) : Observable<void> {

    const url = `${this.baseUrl}/delete/${id}`;
  
    return this.http.delete<void>(url);
  }

  createProduct(product: any)  {

    const url = `${this.baseUrl}/create`;

    return this.http.post<any>(url,product);
  }

}  
