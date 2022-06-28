import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component:CategoriesComponent  },
  { path: 'orders', component: OrdersComponent },
  // { path: 'addproduct', component: AddproductComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
