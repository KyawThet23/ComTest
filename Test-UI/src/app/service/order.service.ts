import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';
import { OrderReceive } from '../common/order-receive';
import { NewOrderItems } from '../common/new-order-items';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `http://localhost:8080/order`

  constructor(private http: HttpClient) { }

  getAllOrder() : Observable<[]> {

    const url = `${this.baseUrl}/all`

    return this.http.get<[]>(url);
  }

  getOrderByCode(code:string) : Observable<[]> {

    const url = `${this.baseUrl}/code/${code}`;

    return this.http.get<[]>(url);
  }

  getOrderByDate(date:string) : Observable<[]> {

    const url = `${this.baseUrl}/date/${date}`

    return this.http.get<[]>(url);
  }

  getOrderedProduct(id: number): Observable<[]> {
    
    const url = `${this.baseUrl}/products/${id}`

    return this.http.get<[]>(url);
  }

  deleteById(id: number) :Observable<void> {

    const url = `${this.baseUrl}/delete/${id}`;

    return this.http.delete<void>(url);

  }

  addNewItem(id:number,item:any) : Observable<void>{

    const url = `${this.baseUrl}/add/${id}`

    return this.http.put<void>(url,item);

  }

  deleteOrderItems(orderId:number , itemId:number , total:number) : Observable<void>{

    const url = `${this.baseUrl}/item/${orderId}/${itemId}/${total}`

    return this.http.delete<void>(url);
    
  }

  public placeOrder(order: any){

    const url = `${this.baseUrl}/create`;

    return this.http.post<any>(url,order);
  }
}
