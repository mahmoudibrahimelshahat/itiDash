import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';
import { category } from '../models/Icategory';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = "http://localhost:3000/api/v1/categories/";
  private _refresh = new Subject<void>();
  get refreshCopmonent() {
    return this._refresh;
  }
  constructor(private httpclient: HttpClient ,  private sharedData: SharedDataService) { }


  private handleError(error: HttpErrorResponse ) {
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


  //display all categories
  getAllCategories(): Observable<category[]> {
    return this.httpclient.get<category[]>(this.categoryUrl);
  }

  //add new category
  addCategory(newProduct: category): Observable<category> {
    return this.httpclient.post<category>(this.categoryUrl, (newProduct))
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

  //delete the category  
  deleteById(id?: string) {
    return this.httpclient.delete(`${this.categoryUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }


  //update category
  updateCategory(id: string, category: category) {
    return this.httpclient.put<category>(`${this.categoryUrl}/${id}`, category)
      .pipe(catchError(this.handleError),
        tap(() => {
          this.sharedData.refreshCopmonent.next()
        }))
  }

}
