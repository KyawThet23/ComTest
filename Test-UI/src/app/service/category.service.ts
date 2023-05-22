import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }

  getAllCategory() : Observable<Category[]> {

    const url = `${this.baseUrl}/all`

    return this.http.get<Category[]>(url);
  }
}
