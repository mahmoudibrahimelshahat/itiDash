import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit, OnDestroy, AfterViewInit {

  successIsOpen: boolean

  constructor(private sharedData: SharedDataService) {
    this.successIsOpen = false;
  }

  ngOnInit(): void {
    this.sharedData.receiveToggleSuccessModal().subscribe(val => {
      this.successIsOpen = val;
      console.log(this.successIsOpen)
    })
  }


  ngAfterViewInit(): void {
    setTimeout(() => {

      this.sharedData.toggleSuccessModal(false)
    }, 1000);

    console.log(this.successIsOpen)
  }
  ngOnDestroy(): void {
    // console.log(this.successIsOpen)
    // this.successIsOpen=false
    // this.sharedData.receiveToggleSuccessModal().unsubscribe()

  }


}
