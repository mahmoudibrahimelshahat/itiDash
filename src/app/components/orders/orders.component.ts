import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iorder } from 'src/app/models/Iorder';
import { OrderService } from 'src/app/services/order.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList: Iorder[] = [];
  modalIsOpen: boolean = false;
  isSorted: boolean = false;
  ordeObj?: Iorder = undefined
  orderForm: FormGroup;
  totalOrders: number = 0;
  page: number = 1;

  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private sharedData: SharedDataService) {
    this.orderForm = formBuilder.group({
      status: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.getAllOrders();
    this.sharedData.refreshCopmonent.subscribe(res => {
      this.getAllOrders()
    })
  }
  getAllOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orderList = orders;
      this.totalOrders=orders.length
    })

  }

  get orderName() {
    return this.orderForm.get("status")
  }

  closeModal(modal: any) {
    // modal.style.display = "none";
    this.modalIsOpen = this.modalIsOpen ? false : true
  }

  openModal(order: Iorder) {
    this.modalIsOpen = this.modalIsOpen ? false : true
    this.orderForm.setValue({
      status: order.status
    })
    this.ordeObj = order
  }

  edite(modal: any) {
    this.ordeObj!.status = this.orderForm.get("status")?.value
    console.log(this.ordeObj)

    this.orderService.updateOrder(this.ordeObj!._id, this.ordeObj!).subscribe(order => {
      console.log(order)
    })
    this.modalIsOpen = false;
    setTimeout(() => {
      this.sharedData.toggleSuccessModal(true)
    }, 500)
    setTimeout(() => {
      this.sharedData.toggleSuccessModal(false)
    }, 2000)
  }

  // sort data

  sortByPrice(event: any) {
    if (!this.isSorted) {
      event.target.classList.add("sort--icon");
      this.orderList = this.orderList.sort((a, b) => {
        return a.totalPrice > (b.totalPrice) ? 1 : -1
      });
      this.isSorted = true;
    }
    else {
      event.target.classList.remove("sort--icon");
      this.orderList = this.orderList.sort((a, b) => {

        return a.totalPrice < (b.totalPrice) ? 1 : -1

      });
      this.isSorted = false


    }
  }

  sortByDate(event: any) {
    if (!this.isSorted) {
      let reversedList;
      event.target.classList.add("sort--icon");
      reversedList= this.orderList.reverse();
      this.isSorted = true;
    }
    else {
      console.log(this.orderList)
      event.target.classList.remove("sort--icon");
      this.orderList = this.orderList.reverse();
      this.isSorted = false


    }

  }
}
