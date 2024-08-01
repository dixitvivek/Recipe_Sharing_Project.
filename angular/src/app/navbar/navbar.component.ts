import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../service/auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
user:any;
  constructor(public authService:AuthService,public router:Router){}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next:data=>{
        this.user=data;
        console.log("requ  uer ",data)
      }
    })
  }

  handleLogout(){
    this.authService.logout()
  }
}
