import { Component, OnInit } from '@angular/core';
import { Chart } from '../../../chart.js';
import { DashboardService } from './dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginserviceService } from '../login/loginservice.service.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers: number = 0
  totalCountry: number = 0
  totalCity: number = 0
  genderData = []
  countryData = []
  cityData = []
  ageData = []
  countryDataTmp = []
  cityDataTmp = []
  noOfCountryShow = 4
  countryStartIndex = 0
  cityStartIndex = 0
  ColorScheme: any;
  countryColorSchema: any
  genderView: any[] = [350, 350];
  CountryCityView: any[] = [400, 300];
  chart = [];
  cFlag = true
  cCounter = 0
  g = []
  cityCounter = 0
  cityFlag = true
  gCity = []
  ageColorSchema: any
  isGlobalError: boolean = false


  constructor(private dashboardService: DashboardService,private loginService : LoginserviceService) {

    Object.assign(this, { this: this.genderData });
    Object.assign(this, { this: this.countryData });
    Object.assign(this, { this: this.cityData });
  }


  ngOnInit() {

    this.getUsersByCountry()
    this.getUsersByCity()
    this.getUsersByGender()
    this.getUsersByAge()


    this.ColorScheme = {
      domain: ['#5AA454', '#A10A28']
    };

    this.countryColorSchema = {
      domain: ['#5050ea']
    }

    this.ageColorSchema = {
      domain: ["blue", "green", "orange", "red"]
    }
  }


  getUsersByAge() {
    var age = [{ name: "10 - 30", value: 0 }, { name: "31 - 50", value: 0 }, { name: "51 - 70", value: 0 }, { name: "70+", value: 0 }]
    this.dashboardService.getUsersByAge().subscribe((response) => {
      this.checkForNewAccessToken(response)
      let data = response.body
      data.forEach(element => {
        age.forEach(ageele => {
          if (element._id == ageele.name) {
            ageele.value = element.noofpeople
          }
        });
      });
      this.ageData = age
    }, (error) => {
      this.isGlobalError = true
    })
  }

  setHeight(length) {
    if (length < 5) {
      this.CountryCityView[1] = 300 - (5 - length) * 50
    }
  }

  updateNextCity() {
    this.cityCounter = this.cityCounter + 1
    this.cityDataTmp = []
    var tmp = []
    if (this.cityStartIndex + this.noOfCountryShow < this.cityData.length) {
      for (let i = this.cityStartIndex + 1; i <= (this.cityStartIndex + this.noOfCountryShow); i++) {
        if (this.cityData[i] != undefined) {
          tmp.push(this.cityData[i])
        }
      }
      this.cityData = tmp
      this.cityStartIndex = this.cityStartIndex + this.noOfCountryShow
    }
    else {
      for (let i = this.cityStartIndex + 1; i < this.cityData.length; i++) {
        tmp.push(this.cityData[i])
      }
      this.cityDataTmp = tmp
      this.cityFlag = false
    }
    if (this.cFlag) {
      this.gCity.push(this.cityStartIndex)
    }
  }

  updateNextCountry() {
    this.cCounter = this.cCounter + 1
    this.countryDataTmp = []
    var tmp = []
    if (this.countryStartIndex + this.noOfCountryShow < this.countryData.length) {
      for (let i = this.countryStartIndex + 1; i <= (this.countryStartIndex + this.noOfCountryShow); i++) {
        if (this.countryData[i] != undefined) {
          tmp.push(this.countryData[i])
        }
      }
      this.countryDataTmp = tmp
      this.countryStartIndex = this.countryStartIndex + this.noOfCountryShow
    }
    else {
      for (let i = this.countryStartIndex + 1; i < this.countryData.length; i++) {
        tmp.push(this.countryData[i])
      }
      this.countryDataTmp = tmp
      this.cFlag = false
    }
    if (this.cFlag) {
      this.g.push(this.countryStartIndex)
    }
  }

  updatePreviousCountry() {
    this.cCounter = this.cCounter - 1
    this.cFlag = true
    this.countryStartIndex = this.g[this.cCounter]
    this.countryDataTmp = []
    var tmp = []
    var c = 0
    while (c < this.noOfCountryShow) {
      tmp.push(this.countryData[this.countryStartIndex - c])
      c = c + 1
    }
    this.countryDataTmp = tmp
  }

  updatePreviousCity() {
    this.cityCounter = this.cityCounter - 1
    this.cityFlag = true
    this.cityStartIndex = this.gCity[this.cityCounter]
    this.cityDataTmp = []
    var tmp = []
    var c = 0
    while (c < this.noOfCountryShow) {
      tmp.push(this.cityData[this.cityStartIndex - c])
      c = c + 1
    }
    this.cityDataTmp = tmp
  }

  getUsersByCountry() {
    var tmp = []
    this.dashboardService.getUsersByCountry().subscribe((response) => {
      this.checkForNewAccessToken(response)
      let data = response.body
      data.forEach(element => {
        tmp.push({ name: element._id, value: element.count })
        this.totalCountry = this.totalCountry + 1
      });
      this.countryData = [...tmp]
      this.countryDataTmp = [...tmp].splice(0, this.noOfCountryShow)
      this.countryStartIndex = this.countryDataTmp.length - 1
      this.g.push(this.countryStartIndex)
      this.setHeight(this.countryDataTmp.length)


    }, (error) => {
      this.isGlobalError = true
    })

  }

  getUsersByCity() {
    var tmp = []
    this.dashboardService.getUsersByCity().subscribe((response) => {
      this.checkForNewAccessToken(response)
      let data = response.body
      data.forEach(element => {
        tmp.push({ name: element._id, value: element.count })
        this.totalCity = this.totalCity + 1
      });
      this.cityData = [...tmp]
      this.cityDataTmp = [...tmp].splice(0, this.noOfCountryShow)
      this.cityStartIndex = this.cityDataTmp.length - 1
      this.gCity.push(this.cityStartIndex)
      this.setHeight(this.cityDataTmp.length)

    }, (error) => {
      this.isGlobalError = true
    })

  }

  getUsersByGender() {
    var tmp = []
    this.dashboardService.getUsersByGender().subscribe((response) => {
      this.checkForNewAccessToken(response)
      let data = response.body
      data.forEach(element => {
        tmp.push({ name: element._id, value: element.count })
        this.totalUsers = this.totalUsers + element.count
      });
      this.genderData = tmp
    }, (error) => {
      this.isGlobalError = true
    })
  }

  checkForNewAccessToken(response) {
    if (response.headers.get('newaccesstoken') != undefined) {
      localStorage.setItem('accesstoken', response.headers.get('newaccesstoken'))
    }
  }

  logOut() {
    this.loginService.logOut()
  }

}
