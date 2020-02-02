import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient,private router : Router) {  }

  authenticate(loginCredentials) {
    var authURL = "http://localhost:4500/login"
    return this.http.post<HttpResponse<Object>>(authURL,loginCredentials,{observe: 'response'})
  }

  logOut(){
    localStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/login'])
  }
}
