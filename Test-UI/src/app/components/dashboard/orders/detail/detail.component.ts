import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

    total !: number

    object !: [];
    searchMode : boolean = false; 

    constructor(private orderService: OrderService , 
                private route: ActivatedRoute,
                private data: DataService) {
                
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.handleDetail();
      })
      this.total = this.data.getData();
    }
    
    handleDetail() {
      this.searchMode = this.route.snapshot.paramMap.has('id');

      if(this.searchMode){
        this.handleDetailsView();
      } else {
        this.object = [];
      }
    }
    
    handleDetailsView() {

      const id : number = +this.route.snapshot.paramMap.get('id')!;

      this.orderService.getOrderedProduct(id).subscribe( data => { 
        this.object = data;
      })
    }
}
