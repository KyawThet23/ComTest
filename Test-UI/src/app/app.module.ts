import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ProductListComponent } from './components/dashboard/products/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { OrderListComponent } from './components/dashboard/orders/order-list/order-list.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { DetailComponent } from './components/dashboard/orders/detail/detail.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './components/dashboard/products/add/add.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'product', component: ProductsComponent, children: [
        { path: 'search/:keyword', component: ProductListComponent},
        { path: 'category/:id' , component: ProductListComponent},
        { path: '' , component: ProductListComponent},
        { path: 'add', component: AddComponent}
      ] },
      { path: 'order', component: OrdersComponent,children: [
        { path: 'search/:code', component: OrderListComponent},
        { path: 'date/:date', component: OrderListComponent},
        { path: '', component: OrderListComponent},
        { path: 'detail/:id',component:DetailComponent}
      ] },
      { path: '', redirectTo: 'product', pathMatch: 'full' },
    ],
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'cart-details', component: CartDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    ProductListComponent,
    OrderListComponent,
    CartStatusComponent,
    CartDetailsComponent,
    DetailComponent,
    AddComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),HttpClientModule, FormsModule, ReactiveFormsModule, NgbModule , MatPaginatorModule, MatTableModule , NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
