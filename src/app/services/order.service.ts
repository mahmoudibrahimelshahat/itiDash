import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Iorder } from '../models/Iorder';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL = "http://localhost:3000/api/v1/orders/";

  constructor(private httpclient: HttpClient , private sharedData:SharedDataService) { }

  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Error occured, please try again')
    )
  }



  //get data from server
  getOrders(): Observable<Iorder[]> {
    return this.httpclient.get<Iorder[]>(this.apiURL)
      .pipe(catchError(this.handleError))
  }


  //update order status
  updateOrder(id: string, order: Iorder) {
    return this.httpclient.put<Iorder>(`${this.apiURL}/${id}`, order)
      .pipe(catchError(this.handleError),
        tap(() => {
          this.sharedData.refreshCopmonent.next()
        }))
  }

}
