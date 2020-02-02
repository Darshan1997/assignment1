import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginserviceService } from './loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup
  submitted: boolean = false
  loggedin: boolean = false

  constructor(private loginservice: LoginserviceService, private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", Validators.required)
    })
  }

  get f() { return this.loginFormGroup.controls; }

  authenticate(formData: FormGroup) {
    this.submitted = true
    this.loginservice.authenticate(formData.value).subscribe((response) => {
      if (response.body['success']) {
        localStorage.setItem('access-token', response.body['accesstoken']);
        localStorage.setItem('refresh-token', response.body['refreshtoken']);
        localStorage.setItem('id', response.body['id']);
        
        localStorage.setItem('isLoggedIn', 'true')
        this.router.navigate(['/home'])
      } else {
        this.loggedin = true
        this.loginFormGroup.reset()
      }

    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error);
    })
  }


}
