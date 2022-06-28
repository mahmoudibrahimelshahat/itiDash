import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/Icategory';
import { Iproduct } from 'src/app/models/Iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ViewModelProduct } from 'src/app/viewmodel/vmProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // preImg: string = "http://localhost:3000/"
  productList: Iproduct[] = [];
  catList: category[] = [];
  isOpen: boolean = false;
  changeAction: boolean = false;
  isSortAcend: boolean = false;
  valFromConfirmMod: boolean = true
  totalProducts: number = 0;
  page: number = 1;

  prodModel: Iproduct = {
    id: "",
    name: "",
    description: "",
    price: 0,
    rating: 1,
    image: "",
    countInStock: 0,
    category: {
      _id: "",
      name: ""
    },
  };
  categoryModel: category = {
    name: "",
    _id: "",
  }

  imgprefix: string = "assets/images/";

  constructor(private productService: ProductsService,
    private categoryService: CategoryService,
    private sharedData: SharedDataService) {

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(category => {
      this.catList = category;
    });
    this.getAllProducts();
    this.sharedData.refreshCopmonent.subscribe(res => {
      this.getAllProducts()
    })

  }


  togleValChanged(toggleVal: any) {
    this.isOpen = toggleVal;
  }
  openModal() {
    this.isOpen = this.isOpen ? false : true;
    this.changeAction = true;

  }
  openEditModal(pro: Iproduct) {
    this.openModal()
    this.prodModel = pro;
    this.changeAction = false;
  }


  getAllProducts() {
    this.productService.getProducts().subscribe(products => {
      this.productList = products;
      this.totalProducts = products.length
    })

  }

  deleteProduct(id?: string) {
    this.sharedData.setConfirmModal(true);
    let confirm;
    this.sharedData.getConfirmModal().subscribe(val => {
      confirm = val
      if (!confirm) {
        this.productService.delete(id).subscribe(res => {
          this.getAllProducts();
          this.sharedData.toggleSuccessModal(true)
          setTimeout(() => {
            this.sharedData.toggleSuccessModal(true)
          }, 500)
          setTimeout(() => {
            this.sharedData.toggleSuccessModal(false)

          }, 2000)

        })
      }
    })


  }
  // sorting 
  sortByName(event: any) {
    event.target.classList.add("sort--icon");
    if (!this.isSortAcend) {
      this.productList = this.productList.sort((a, b) => {
        return a.name.localeCompare(b.name)
        // return a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? 1 : -1
      });
      this.isSortAcend = true;
    }
    else {
      event.target.classList.remove("sort--icon");
      this.productList = this.productList.sort((a, b) => {
        return b.name.localeCompare(a.name);

      });
      this.isSortAcend = false

    }
  }

  sortByPrice(event: any) {
    if (!this.isSortAcend) {
      event.target.classList.add("sort--icon");
      console.log(event.target)
      this.productList = this.productList.sort((a, b) => {
        return a.price > (b.price) ? 1 : -1
      });
      this.isSortAcend = true;
    }
    else {
      event.target.classList.remove("sort--icon")
      this.productList = this.productList.sort((a, b) => {

        return a.price < (b.price) ? 1 : -1

      });
      this.isSortAcend = false

    }
  }


  sortByStock(event: any) {
    if (!this.isSortAcend) {
      event.target.classList.add("sort--icon");
      this.productList = this.productList.sort((a, b) => {
        return a.countInStock > b.countInStock ? 1 : -1
      });
      this.isSortAcend = true;
    }
    else {
      event.target.classList.remove("sort--icon");
      this.productList = this.productList.sort((a, b) => {
        return a.countInStock < b.countInStock ? 1 : -1

      });
      this.isSortAcend = false


    }

  }


}
