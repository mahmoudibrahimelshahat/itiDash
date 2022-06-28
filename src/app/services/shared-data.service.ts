import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private _refresh = new Subject<void>();
  private toggleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private successModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private confirmModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  // to update the table after any action on the data
  get refreshCopmonent() {
    return this._refresh;
  }

  constructor() { }
  //toggle to change value of sidebar
  sendTOggleVal(data: boolean) {
    this.toggleSource.next(data)
  }
  reciveTOggleVal(): Observable<boolean> {
    return this.toggleSource
  }


  // observable for success modal
  toggleSuccessModal(val: boolean) {
    this.successModal.next(val)
  }
  receiveToggleSuccessModal() {
    return this.successModal;
  }
  // observable for confirm modal
  setConfirmModal(val: boolean) {
    this.confirmModal.next(val)
  }
  getConfirmModal() {
    return this.confirmModal;
  }


  

}
