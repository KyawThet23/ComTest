import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{

  orders : Order[] = [];
  searchMode : boolean = false;
  dateMode: boolean = false;

  constructor ( 
                private orderService : OrderService , 
                private route : Router, 
                private activeRoute : ActivatedRoute,
                private data : DataService
                ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      this.handleList();
    })
    
  }

  handleList() {

    this.searchMode = this.activeRoute.snapshot.paramMap.has('code'); 
    this.dateMode = this.activeRoute.snapshot.paramMap.has('date');

    if(this.searchMode){
      this.handleSearch();
    } else if(this.dateMode){
      this.handleDate()
    }
     else {
      this.orderService.getAllOrder().subscribe(
        data => this.orders = data
      )
    }
  }
  handleDate() {
    const date : string = this.activeRoute.snapshot.paramMap.get('date')!;
    this.orderService.getOrderByDate(date).subscribe( data => {
      this.orders = data;
    }) 
  }

  handleSearch() {
    const code : string = this.activeRoute.snapshot.paramMap.get('code')!;
    this.orderService.getOrderByCode(code).subscribe(data => {
      this.orders = data;
    })
  }

  view(id:number,qty: number){
    this.data.setData(qty)
    this.route.navigateByUrl(`dashboard/order/detail/${id}`);
  }

  delete(id: number) {
    this.orderService.deleteById(id).subscribe();
    this.route.navigateByUrl(`dashboard/order`)
  }  
}