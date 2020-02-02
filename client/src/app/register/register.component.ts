import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RegisterserviceService } from './registerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup
  city: any
  country: any
  gender: any
  submited: boolean = false

  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private router: Router) { }

  ngOnInit() {

    // this.registerService.getCountry().subscribe((data) => {
    //   console.log(data);
    // })

    this.city = ['Bangaluru', 'Pune', 'Ahmedabad', 'Delhi','Mumbai','Kolkata','Hydrabad','Chennai']
    this.country = ["india"]
    this.gender = ['Male', 'Female']


    this.registerFormGroup = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      age: new FormControl('', Validators.required),
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phonenumber: new FormControl('', Validators.min(10)),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: ['user', Validators.required]
    })

  }


  register(userData: FormGroup) {

    this.registerService.register(userData.value).subscribe((data) => {
      if (data['status']) {
        this.router.navigate(['/login'])
      } else {
        alert(data['message'])
      }
    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error);
    })
  }

  get f() {
    return this.registerFormGroup.controls
  }



}
