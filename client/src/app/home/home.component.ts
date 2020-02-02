import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterserviceService } from '../register/registerservice.service';
import { LoginserviceService } from '../login/loginservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: any = []
  userTodelete: any
  registerFormGroup: FormGroup
  editFormGroup: FormGroup
  city: any
  country: any
  gender: any
  avaEmails = []
  currentUser: any


  constructor(private homeService: HomeService, private registerService: RegisterserviceService, private router: Router, private fb: FormBuilder, private loginService: LoginserviceService) {

  }

  ngOnInit() {
    this.city = ['bangaluru', 'pune', 'ahmedabad', 'delhi']
    this.country = ["india"]
    this.gender = ['Male', 'Female']
    this.getUserData()

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
      
    })

    this.editFormGroup = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      age: new FormControl('', Validators.required),
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phonenumber: new FormControl('', Validators.min(10)),
      email: new FormControl(''),
      
    })
  }


  checkEmailAvailability(event) {
    if (this.avaEmails.indexOf(event.target.value) > -1) {
      this.registerFormGroup.controls.email.setErrors({ 'email': true })
    }
  }

  getUserData() {
    this.homeService.getUsers().subscribe((response) => {
      this.checkForNewAccessToken(response)
      this.userData = response.body
      this.getEmails()
    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error);
    })
  }

  getEmails() {
    this.userData.forEach(element => {
      console.log(element);
      this.avaEmails.push(element.email)
    });
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard'])
  }

  setNumberToDelete(itemData) {
    this.userTodelete = itemData
  }

  editUser(item) {
    console.log(item['userinfo'].firstname);
    this.editFormGroup.patchValue({
      firstname: item['userinfo'].firstname,
      lastname: item['userinfo'].lastname,
      age: item['userinfo'].age,
      country: item['userinfo'].country,
      gender: item['userinfo'].gender,
      city: item['userinfo'].city,
      phonenumber: item['userinfo'].phonenumber,
      email: item.email,
      
    })

  }

  editUserItems() {
    this.homeService.editUsers(this.editFormGroup.value).subscribe((response) => {
      this.checkForNewAccessToken(response)
      this.registerFormGroup.reset()
      this.getUserData()
    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error.message);
    })

  }

  checkForNewAccessToken(response) {
    if (response.headers.get('newaccesstoken') != undefined) {
      localStorage.setItem('accesstoken', response.headers.get('newaccesstoken'))
    }
  }

  removeUser() {
    this.homeService.removeUser({ userdata: this.userTodelete }).subscribe((response) => {
      this.checkForNewAccessToken(response)
      if (response.body['success']) {
        alert('User Removed Successfully')
      }

      this.getUserData()
    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error.message);
    })
  }

  addUser() {
    this.registerService.register(this.registerFormGroup.value).subscribe((data) => {
      if (data['status']) {
        this.getUserData()
        this.registerFormGroup.reset()
      }
    }, (error) => {
      alert("Error occured! Please Retry")
      console.log(error.message);
    })

  }

  get f() {
    return this.registerFormGroup.controls
  }

  logOut() {
    this.loginService.logOut()
  }


}
