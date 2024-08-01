import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'angular';
  user:any

  constructor(public authService:AuthService){}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next:data=>console.log("user ---- ",data),
      error:error=>console.log("error",error)
    })
    this.authService.authSubject.subscribe(
      (auth)=>{
        console.log("auth ------- ",auth)
        this.user=auth.user
      }
    )
  }
}
