import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderReceive } from 'src/app/common/order-receive';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{

  object : OrderReceive[] = [];
  searchMode : boolean = false;
  dateMode: boolean = false;


  constructor ( 
                private orderService : OrderService , 
                private route : Router, 
                private activeRoute : ActivatedRoute
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
    }else {
      this.orderService.getAllOrder().subscribe(
        data => {
          this.object = data,
          console.log(this.object);
        }
      )
    }
  }
  handleDate() {
    const date : string = this.activeRoute.snapshot.paramMap.get('date')!;
    this.orderService.getOrderByDate(date).subscribe( data => {
      this.object = data;
    }) 
  }

  handleSearch() {
    const code : string = this.activeRoute.snapshot.paramMap.get('code')!;
    this.orderService.getOrderByCode(code).subscribe(data => {
      this.object = data;
    })
  }

  view(id:number){
    this.route.navigateByUrl(`/detail/${id}`);
  }

  delete(id: any) {
    this.orderService.deleteById(id).subscribe();
    console.log(id);
    window.location.reload();
  }  

  openModal(event : MouseEvent) : void{
    event.stopPropagation();
  }
  
}

