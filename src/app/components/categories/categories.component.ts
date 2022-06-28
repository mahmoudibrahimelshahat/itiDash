import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/Icategory';
import { Iproduct } from 'src/app/models/Iproduct';

import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  productList: Iproduct[] = [];
  categoryList: category[] = [];
  addCatIsOpen: boolean = false;
  isEditeCat: boolean = false;
  alreadyExist: boolean = true
  SentCatObjModel: category = {
    _id: "",
    name: ""
  }
  constructor(private catgoryService: CategoryService, private sharedData: SharedDataService, private productService: ProductsService) { }
  ngOnInit(): void {
    this.getCategories();
    this.sharedData.refreshCopmonent.subscribe(res => {
      this.getCategories()
    });

    this.productService.getProducts().subscribe(products => {
      this.productList = products;
    })
  }

  //get all categories
  getCategories() {
    this.catgoryService.getAllCategories().subscribe(category => {
      this.categoryList = category;
      console.log(category)
    })
  }

  deleteCategory(id: string) {
    let flag = false;
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].category?._id === id) {
        flag = false;
        this.alreadyExist = false;
        console.log("there is products related to this category");
        break;
      }
      else {
        flag = true;
        this.alreadyExist = true;
        console.log(this.alreadyExist)
      }
    }
    if (flag) {
      this.sharedData.setConfirmModal(true);
      let confirm;
      this.sharedData.getConfirmModal().subscribe(val => {
        confirm = val;

        if (!confirm) {
          this.catgoryService.deleteById(id).subscribe(
            (res => {
              console.log(res)
              this.getCategories();
              setTimeout(() => {
                this.sharedData.toggleSuccessModal(true)
              }, 500)
              setTimeout(() => {
                this.sharedData.toggleSuccessModal(false)

              }, 2000)

            })
          )

        }
      })
    }
  }

  //to open category modal
  openCatModal() {
    this.addCatIsOpen = this.addCatIsOpen ? false : true;
    this.isEditeCat = false;
  }

  openEditModal(catObj: category) {
    this.openCatModal()
    this.SentCatObjModel = catObj;
    this.isEditeCat = true;
  }

  //change the value of toggle add category modal
  toggleOpenCatModal(val: boolean) {
    this.addCatIsOpen = val;
  }

  closeModal(modal: any) {
    modal.style.display = "none";
    this.alreadyExist=true
  }
}
