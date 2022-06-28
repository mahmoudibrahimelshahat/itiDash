import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsersCount() {
    return this.httpClient.get<any>("http://localhost:3000/api/v1/users/get/count")
  }
}
