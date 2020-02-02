import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  constructor(private http: HttpClient) { }

  register(userData) {
    var regURL = "http://localhost:4500/register"
    return this.http.post(regURL, userData)
  }

  // getCountry() {
  //   return this.http.get('../../../');
  // }
}
