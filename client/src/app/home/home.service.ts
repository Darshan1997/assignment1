import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    
  }

  getUsers(): Observable<HttpResponse<any>> {
    var URL = "http://localhost:4500/users/getUsers"
    return this.http.get<HttpResponse<any>>(URL,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })
  }

  removeUser(phonenumber): Observable<any> {
    // console.log(phonenumber);
    var URL = "http://localhost:4500/users/removeUsers"
    return this.http.post(URL, phonenumber,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })

  }

  addUsers(userData): Observable<any> {
    var URL = "http://localhost:4500/users/addUsers"
    return this.http.post(URL, userData,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })
  }


  editUsers(userData): Observable<any> {
    var URL = "http://localhost:4500/users/editUsers"
    return this.http.post(URL, userData,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })

  }

}
