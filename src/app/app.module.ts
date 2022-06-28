import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeletemodalComponent } from './components/deletemodal/deletemodal.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProductsComponent,
    OrdersComponent,
    AddproductComponent,
    NotFoundPageComponent,
    HeaderComponent,
    DashboardComponent,
    CategoriesComponent,
    SuccessModalComponent,
    AddCategoryComponent,
    DeletemodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
