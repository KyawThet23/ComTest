import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  selectedDate !: string;

  constructor(private route : Router){}

  searchCode(data : string){
    this.route.navigateByUrl(`/order/search/${data}`);
  }

  importDate(){
    const date = this.formatDate(this.selectedDate);
    this.route.navigateByUrl(`/order/date/${date}`);
  }

  private formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  addOrder(){
    this.route.navigateByUrl('/addOrder')
  }
}
