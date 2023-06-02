import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { AddComponent } from './components/products/add/add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedService } from './service/shared.service';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ProductList2Component } from './components/product-list2/product-list2.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

const routes: Routes = [
  {
    path: 'product',
    component: ProductsComponent,
    children: [
      {
        path: 'search/:keyword',
        component: ProductListComponent
      },
      {
        path: 'category/:id',
        component: ProductListComponent
      },
      { path: '', component: ProductListComponent },
    ],
  },
  {
    path: 'order',
    component: OrdersComponent,
    children: [
      { path: 'search/:code', component: OrderListComponent },
      { path: 'date/:date', component: OrderListComponent },
      { path: '', component: OrderListComponent },
    ],
  },
  { path: 'addProduct', component: AddComponent },
  { path: 'addOrder', component: AddOrderComponent },
  { path: 'detail/:id', component: OrderDetailsComponent },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ProductsComponent,
    OrdersComponent,
    ProductListComponent,
    OrderListComponent,
    AddComponent,
    AddOrderComponent,
    CartDetailsComponent,
    OrderDetailsComponent,
    ProductList2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    NgDynamicBreadcrumbModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
