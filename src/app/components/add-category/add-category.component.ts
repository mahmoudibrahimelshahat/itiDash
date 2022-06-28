import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { category } from 'src/app/models/Icategory';
import { Iproduct } from 'src/app/models/Iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnChanges {
  categoryList: category[] = [];
  productList: Iproduct[] = [];
  alreadyExist: boolean = false;
  @Output() closeCatModal = new EventEmitter()
  @Input() recivedCatObj: category = {
    _id: '',
    name: ''
  }
  @Input() isEditModal!: boolean;
  categoryForm: FormGroup;
  constructor(private fomBuilde: FormBuilder, private catService: CategoryService,
    private sharedData: SharedDataService,
    private productService: ProductsService) {
    this.categoryForm = fomBuilde.group({
      name: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(category => {
      this.categoryList = category;
    });
    this.productService.getProducts().subscribe(products => {
      this.productList = products;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditModal) {
      this.displayCatInfo()
    }

  }


  get categName() {
    return this.categoryForm.get("name")
  }

  closeModal(modal: any) {
    modal.style.display = "none";
    this.closeCatModal.emit(false)
  }

  submitNewCategory(modal: any) {
    let catObj: category = this.categoryForm.value;
    var flag = false;
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].name.toLowerCase() === catObj.name.toLowerCase()) {
        flag = false;
        this.alreadyExist = true;
        console.log("not add");
        break;
      }
      else {
        flag = true;
        this.alreadyExist = false;
      }

    }
    if (flag) {
      this.catService.addCategory(catObj).subscribe(newcat => {
        setTimeout(() => {
          this.closeModal(modal)

        }, 100);

        setTimeout(() => {
          this.sharedData.toggleSuccessModal(true)
        }, 500)
        setTimeout(() => {
          this.sharedData.toggleSuccessModal(false)

        }, 2000)
      })
    }

  }


  displayCatInfo() {
    this.categoryForm.patchValue({
      name: this.recivedCatObj?.name,
    })

  }

  edite(modal: any) {
    this.recivedCatObj.name = this.categoryForm.get("name")?.value;
    var flag = false;
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].name.toLowerCase() === this.recivedCatObj.name.toLowerCase()) {
        flag = false;
        this.alreadyExist = true;
        console.log("not add");
        break;
      }
      else {
        flag = true;
        this.alreadyExist = false;
      }

    }
    if (flag) {
      this.catService.updateCategory(this.recivedCatObj._id!, this.recivedCatObj).subscribe(res => {
        console.log(modal)
        this.closeModal(modal)
        setTimeout(() => {
          this.sharedData.toggleSuccessModal(true)
        }, 500)
        setTimeout(() => {
          this.sharedData.toggleSuccessModal(false)

        }, 2000)

      })

    }
  }

}
