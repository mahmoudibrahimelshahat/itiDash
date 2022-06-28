

import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iproduct } from '../models/Iproduct';
import { SharedDataService } from './shared-data.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = "http://localhost:3000/api/v1/products/";
  private productsCount = "http://localhost:3000/api/v1/products/get/count"


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

  constructor(private httpclient: HttpClient, private sharedData: SharedDataService) {

  }


  //get data from server
  getProducts(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(this.apiURL)
      .pipe(catchError(this.handleError))
  }


  // get products count
  getProductsCount(): Observable<any> {
    return this.httpclient.get<any>(this.productsCount)
      .pipe(catchError(this.handleError))
  }


  //add new product
  addProduct(newProduct: FormData) {
    return this.httpclient.post<Iproduct>(this.apiURL, newProduct)
      .pipe(
        retry(2),
        catchError((err: HttpErrorResponse) => {
          console.log(err.status, err.error);
          return throwError(() => new Error(err.error));
        })
        , tap(() => {
          this.sharedData.refreshCopmonent.next()
        })
      );
  }


  //delete the product  
  delete(id?: string) {
    return this.httpclient.delete(`${this.apiURL}/${id}`)
      .pipe(catchError(this.handleError))

  }

  //update product
  updateProduct(id: string, product: FormData):Observable<Iproduct>  {
    console.log(product)
    console.log(id)
    return this.httpclient.put<Iproduct>(`${this.apiURL}/${id}`, product)
      .pipe(catchError(this.handleError),
        tap(() => {
          this.sharedData.refreshCopmonent.next()
        }))
  }

}














