import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../login/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getUsersByGender():Observable<any>{
    var URL = "http://localhost:4500/api/users/gender"
    return this.http.get(URL,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })
  }

  getUsersByAge():Observable<any>{
    var URL = "http://localhost:4500/api/users/age"
    return this.http.get(URL,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })
  }

  getUsersByCountry():Observable<any>{
    var URL = "http://localhost:4500/api/users/country"
    return this.http.get(URL,
      {
        headers: {
          'authorization': localStorage.getItem('access-token'),
          'refreshtoken': localStorage.getItem('refresh-token'),
          'id': localStorage.getItem('id')
        }
        , observe: 'response'
      })
  }

  getUsersByCity():Observable<any>{
    var URL = "http://localhost:4500/api/users/city"
    return this.http.get(URL,
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
