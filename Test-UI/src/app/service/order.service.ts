import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `http://localhost:8080/order`

  constructor(private http: HttpClient) { }

  getAllOrder() : Observable<Order[]> {

    const url = `${this.baseUrl}/all`

    return this.http.get<Order[]>(url);
  }

  getOrderByCode(code:string) : Observable<Order[]> {

    const url = `${this.baseUrl}/code/${code}`;

    return this.http.get<Order[]>(url);
  }

  getOrderByDate(date:string) : Observable<Order[]> {

    const url = `${this.baseUrl}/date/${date}`

    return this.http.get<Order[]>(url);
  }

  getOrderedProduct(id: number): Observable<[]> {
    
    const url = `${this.baseUrl}/products/${id}`

    return this.http.get<[]>(url);
  }

  deleteById(id: number) :Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;

    return this.http.delete<void>(url);
  }
}
