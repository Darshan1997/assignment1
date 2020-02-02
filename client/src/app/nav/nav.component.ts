import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() navtitle: String
  
  constructor(private router : Router) { 
    
  }

  ngOnInit() {
    
  }

  logOut(){
    localStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/login'])
  }

}
