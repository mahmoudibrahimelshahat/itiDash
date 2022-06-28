import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent implements OnInit , OnDestroy {
  
  confirmModal: boolean
  constructor(private sharedData: SharedDataService) {
    this.confirmModal = false
  }

  ngOnInit(): void {
    this.sharedData.getConfirmModal().subscribe(val => {
      this.confirmModal = val;
      console.log(this.confirmModal)
    })
  }

  deleteRcord() { 
    this.sharedData.setConfirmModal(false)
  }

  closeModal(modal: any) {
   this.confirmModal=false

  }

  ngOnDestroy(){
    this.sharedData.getConfirmModal().unsubscribe()


  }
}
